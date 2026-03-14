import { getBrowser } from "./browserManager";

export const browserService = async (program: string, enrollment: string) => {
  const browser = getBrowser();

  const page = await browser.newPage();
  await page.setCacheEnabled(false);

  await page.setExtraHTTPHeaders({
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  });

  /* ---------- HEADLESS BYPASS ---------- */
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });

  //blocking unnecessary request
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    const resourceType = request.resourceType();

    if (
      resourceType === "image" ||
      resourceType === "font" ||
      resourceType === "media"
      // resourceType === "stylesheet"
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });

  try {
    await page.goto("https://gradecard.ignou.ac.in/gradecard/login.aspx", {
      waitUntil: "networkidle2", // Wait until network is quiet
    });

    // await page.reload({ waitUntil: "domcontentloaded" });

    const title = await page.title();

    /* ---------- STEP 1: SELECT GRADE TYPE ---------- */

    await page.waitForSelector("#ddlGradecardfor");
    await page.select("#ddlGradecardfor", "1");

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

    /* ---------- STEP 3: SET ENROLLMENT VALUE (DOM SAFE) ---------- */

    await page.evaluate((val) => {
      const input = document.querySelector(
        "#txtEnrno",
      ) as HTMLInputElement | null;
      if (!input) return;

      input.scrollIntoView({ block: "center" });
      input.focus();
      input.value = val;

      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
      input.dispatchEvent(new Event("blur", { bubbles: true }));
    }, enrollment);

    /* ---------- HANDLE ALERT ---------- */
    let dialogMessage: string | null = null;
    page.on("dialog", async (dialog) => {
      dialogMessage = dialog.message();
      console.log("IGNOU Alert:", dialogMessage);
      await dialog.accept();
    });

    /* ---------- STEP 4: SUBMIT FORM ---------- */
    await page.waitForSelector("#btnlogin", { visible: true });

    // We click the button and then race to see what happens first:
    // a result table or a dialog message.
    await page.click("#btnlogin");

    try {
      await Promise.race([
        // Success case: the table appears
        page.waitForSelector("#ctl00_ContentPlaceHolder1_gvDetail", {
          timeout: 15000,
        }),

        // Failure case: we wait for dialogMessage to be set by the listener
        new Promise((_, reject) => {
          const checkInterval = setInterval(() => {
            if (dialogMessage) {
              clearInterval(checkInterval);
              reject(new Error(dialogMessage));
            }
          }, 100);
          // Kill the interval if nothing happens in 10s
          setTimeout(() => clearInterval(checkInterval), 10000);
        }),
      ]);
    } catch (err: any) {
      return {
        success: false,
        message: dialogMessage || "Timed out waiting for grade card results.",
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

      for (let i = 1; i < rows.length - 1; i++) {
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

    let total = 0;
    for (const grade of result.grades) {
      total +=
        (grade.Theory ?? 0) * 0.7 +
        (grade.Assignment ?? 0) * 0.3 +
        (grade.Practical ?? 0) * 0.7;
    }

    const percentage = total / result.grades.length;

    return {
      success: true,
      title,
      data: result,
      percentage,
      length: result.grades.length,
      dialogMessage
    };
  } catch (err) {
    console.log("ERROR:", err);
    await page.screenshot({
      path: `error-${Date.now()}.jpg`,
      fullPage: true,
    });

    return {
      success: false,
      message: "Scraping failed",
    };
  } finally {
    await page.close();
  }
};
