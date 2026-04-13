import { createPage } from "../utils/puppeteerSetup";

export const resultService = async (
  categoryType: string,
  program: string,
  enrollment: string
) => {
  const page = await createPage();

  /* ---------- HANDLE ALERT ---------- */
  let dialogMessage: string | null = null;
  page.on("dialog", async (dialog) => {
    dialogMessage = dialog.message();
    console.log("IGNOU Alert:", dialogMessage);
    await dialog.accept();
  });

  try {
    await page.goto("https://gradecard.ignou.ac.in/gradecard/login.aspx", {
      waitUntil: "domcontentloaded", // networkidle2 --> Wait until network is quiet
      timeout: 20000,
    });

    const title = await page.title();

    /* ---------- STEP 1: SELECT GRADE TYPE ---------- */

    await page.waitForSelector("#ddlGradecardfor");

    // const programFirstOption = await page.evaluate(() => {
    //   const optionsFirst = document.querySelectorAll("#ddlGradecardfor option");

    //   const programOption: any[] = [];

    //   optionsFirst.forEach((val, indx) => {
    //     const value = val.getAttribute("value");
    //     const label = val.textContent?.trim();

    //     programOption.push({ value, label });
    //   });
    //   return programOption;
    // });

    await page.select("#ddlGradecardfor", categoryType);

    await page.waitForFunction(() => {
      const ddl = document.querySelector(
        "#ddlProgram",
      ) as HTMLSelectElement | null;
      return ddl && ddl.options.length > 5;
    });

    /* ---------- STEP 2: SELECT PROGRAM ---------- */

    await page.select("#ddlProgram", program.toUpperCase());

    await page.waitForFunction(() => {
      const input = document.querySelector("#txtEnrno");
      return input instanceof HTMLInputElement && !input.disabled;
    });

    // const programSecondOption = await page.evaluate(() => {
    //   const optionSecond = document.querySelectorAll("#ddlProgram option");

    //   const secondProgramOption: any[] = [];

    //   secondProgramOption.forEach((val, indx) => {
    //     const value = val.getAttribute("value");
    //     const label = val.textContent?.trim();

    //     secondProgramOption.push({ value, label });
    //   });
    //   return optionSecond;
    // });

    /* ---------- STEP 3: SET ENROLLMENT VALUE SAFELY ---------- */

    await page.waitForSelector("#txtEnrno", { visible: true });

    let success = false;

    for (let i = 0; i < 3; i++) {
      await page.evaluate((val) => {
        const input = document.querySelector(
          "#txtEnrno",
        ) as HTMLInputElement | null;
        if (!input) return;

        input.focus();

        // clear
        input.value = "";

        // simulate typing character by character
        for (let i = 0; i < val.length; i++) {
          input.value += val[i];

          input.dispatchEvent(new KeyboardEvent("keydown", { bubbles: true }));
          input.dispatchEvent(new KeyboardEvent("keypress", { bubbles: true }));
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.dispatchEvent(new KeyboardEvent("keyup", { bubbles: true }));
        }

        input.dispatchEvent(new Event("change", { bubbles: true }));
        input.dispatchEvent(new Event("blur", { bubbles: true }));
      }, enrollment);

      // wait a bit for JS to process
      await new Promise((r) => setTimeout(r, 400));

      const value = await page.$eval(
        "#txtEnrno",
        (el) => (el as HTMLInputElement).value,
      );

      if (value === enrollment) {
        success = true;
        break;
      }
    }

    if (!success) {
      throw new Error("Failed to input enrollment after multiple attempts");
    }

    // ✅ final safety check
    const finalValue = await page.$eval(
      "#txtEnrno",
      (el) => (el as HTMLInputElement).value,
    );

    if (finalValue !== enrollment) {
      throw new Error("Enrollment not entered correctly");
    }

    // small delay (IGNOU JS needs this)
    await new Promise((resolve) => setTimeout(resolve, 300));

    /* ---------- STEP 4: SUBMIT FORM ---------- */

    await page.waitForSelector("#btnlogin", { visible: true });

    await page.click("#btnlogin");

    try {
      await Promise.race([
        // Success case: the table appears
        page.waitForSelector("#ctl00_ContentPlaceHolder1_gvDetail", {
          timeout: 22000,
        }),

        // Failure case: browser alert detected
        new Promise((_, reject) => {
          const checkInterval = setInterval(() => {
            if (dialogMessage) {
              clearInterval(checkInterval);
              reject(new Error(dialogMessage));
            }
          }, 100);

          // Match the timeout of the selector for consistency
          setTimeout(() => clearInterval(checkInterval), 22000);
        }),
      ]);
    } catch (err: any) {
      // If it's a timeout, give a clear "server busy" message
      const errorMessage =
        err.name === "TimeoutError"
          ? "IGNOU server is slow. Please try again."
          : dialogMessage || "An error occurred during scraping.";

      return {
        success: false,
        message: errorMessage,
      };
    }

    /* ---------- STEP 5: EXTRACT ---------- */
    // If we reach here, Step 4 passed and the table exists.

    if (dialogMessage) {
      return {
        success: false,
        message: dialogMessage,
      };
    }

    await page.waitForSelector("#ctl00_ContentPlaceHolder1_gvDetail", {
      timeout: 15000,
    });

    /* ---------- STEP 6: EXTRACT ---------- */

    const result = await page.evaluate(() => {
      const student = {
        name: document
          .querySelector("#ctl00_ContentPlaceHolder1_lblDispname")
          ?.textContent?.trim(),
        enrollment: document
          .querySelector("#ctl00_ContentPlaceHolder1_lblDispEnrolno")
          ?.textContent?.trim(),
        program: document
          .querySelector("#ctl00_ContentPlaceHolder1_lblDispProgCode")
          ?.textContent?.trim(),
      };

      const grades: any[] = [];
      const rows = document.querySelectorAll(
        "#ctl00_ContentPlaceHolder1_gvDetail tr",
      );

      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll("td");
        if (cells.length < 9) continue;

        grades.push({
          Course: cells[0]?.textContent?.trim(),
          Assignment:
            cells[1]?.textContent?.trim() === "-"
              ? null
              : Number(cells[1]?.textContent),
          Theory:
            cells[6]?.textContent?.trim() === "-"
              ? null
              : Number(cells[6]?.textContent),
          Practical:
            cells[7]?.textContent?.trim() === "-"
              ? null
              : Number(cells[7]?.textContent),
          Status: cells[8]?.textContent?.trim(),
        });
      }

      return { student, grades };
    });

    if (!result.grades.length)
      return { success: false, message: "No record found" };

    /* ---------- CALC ---------- */

    let totalMarks = 0;
    let sum_assignment = 0;
    let sum_theory = 0;
    let sum_practical = 0;
    let statusComplete = 0;
    let statusIncomplete = 0;

    for (const grade of result.grades) {
      // Calculate individual weighted components for this specific subject
      const weightedAssignment = (grade.Assignment ?? 0) * 0.3;
      const weightedTheory = (grade.Theory ?? 0) * 0.7;
      const weightedPractical = (grade.Practical ?? 0) * 0.7;

      if (grade.Status === "COMPLETED") {
        statusComplete += 1;
      } else {
        statusIncomplete += 1;
      }

      // Add to individual category sums
      sum_assignment += grade.Assignment ?? 0;
      sum_theory += grade.Theory ?? 0;
      sum_practical += grade.Practical ?? 0;

      // Total subject marks calculate
      totalMarks += weightedAssignment + weightedTheory + weightedPractical;
    }
    const percentage = totalMarks / result.grades.length;

    return {
      success: true,
      title,
      data: result,
      dialogMessage,

      subjectsDetails: {
        percentage: Number(percentage.toFixed(2)), // Clean decimal
        length: result.grades.length,
        statusComplete,
        statusIncomplete,
      },
      raw_sums: {
        total_assignment_marks: Number(sum_assignment.toFixed(2)),
        total_theory_marks: Number(sum_theory.toFixed(2)),
        total_practical_marks: Number(sum_practical.toFixed(2)),
      },
    };
  } catch (err) {
    console.log("ERROR:", err);
    await page.screenshot({
      path: `error-${Date.now()}.jpg`,
      fullPage: true,
    });

    return {
      success: false,
      message: "Scraping failed for result page",
    };
  } finally {
    await page.close();
  }
};
