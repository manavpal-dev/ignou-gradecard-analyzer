import puppeteer from "puppeteer";

export const browserService = async (program: string, enrollment: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  const page = await browser.newPage();

  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
  );
  /* ---------- DEBUG ---------- */
  // page.on("requestfailed", (r) => console.log("FAILED:", r.url()));
  // page.on("console", (msg) => console.log("BROWSER:", msg.text()));

  /* ---------- HEADLESS BYPASS ---------- */
  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, "webdriver", { get: () => false });
  });

  try {
    await page.goto("https://gradecard.ignou.ac.in/gradecard/login.aspx", {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });

    await page.reload({ waitUntil: "domcontentloaded" });

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

    /* ---------- STEP 4: SUBMIT FORM SAFELY ---------- */

    await page.waitForFunction(() => {
      const btn = document.querySelector("#btnlogin");
      return btn && !btn.hasAttribute("disabled");
    });

    await page.evaluate(() => {
      const btn = document.querySelector("#btnlogin") as HTMLElement | null;
      btn?.click();
    });

    /* ---------- STEP 5: WAIT FOR RESULT ---------- */

    await page.waitForSelector("#ctl00_ContentPlaceHolder1_gvDetail", {
      timeout: 60000,
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
    for (const g of result.grades) {
      total +=
        (g.Theory ?? 0) * 0.7 +
        (g.Assignment ?? 0) * 0.3 +
        (g.Practical ?? 0) * 0.7;
    }

    const percentage = total / result.grades.length;

    return {
      success: true,
      title,
      data: result,
      percentage,
      length: result.grades.length,
    };
  } catch (err) {
    console.log("ERROR:", err);
    await page.screenshot({ path: "fatal.png", fullPage: true });

    return {
      success: false,
      message: "Scraping failed",
    };
  } finally {
    await browser.close();
  }
};
