import { createPage } from "../utils/puppeteerSetup";

export const categoryService = async () => {
  const page = await createPage();

  try {
    await page.goto("https://gradecard.ignou.ac.in/gradecard/login.aspx", {
      waitUntil: "domcontentloaded", // networkidle2 --> Wait until network is quiet
      timeout: 20000,
    });

    /* ---------- STEP 1: SELECT GRADE TYPE ---------- */
    await page.waitForSelector("#ddlGradecardfor");

    const categoryOptions = await page.evaluate(() => {
      const optionSelector = document.querySelectorAll(
        "#ddlGradecardfor option",
      );

      const programArray: Array<{ value: string; label: string }> = [];

      optionSelector.forEach((val, indx) => {
        const value = (val as HTMLOptionElement).value.trim();
        const label = val.textContent?.trim() || "";

        if (value !== "0" && label.toLowerCase() !== "select") {
          programArray.push({ value, label });
        }
      });
      return programArray;
    });
    return {
      success: true,
      categoryOptions,
    };
  } catch (error) {
    console.log("ERROR:", error);
    await page.screenshot({
      path: `error-${Date.now()}.jpg`,
      fullPage: true,
    });

    return {
      success: false,
      message: "Scraping failed for category page",
    };
  } finally {
    await page.close();
  }
};
