import { createPage } from "../utils/puppeteerSetup";

export const programService = async (categoryType: string) => {
  const page = await createPage();

  try {
    await page.goto("https://gradecard.ignou.ac.in/gradecard/login.aspx", {
      waitUntil: "domcontentloaded", // networkidle2 --> Wait until network is quiet
      timeout: 20000,
    });

    await page.waitForSelector("#ddlGradecardfor");

    await page.select("#ddlGradecardfor", categoryType);

    await page.waitForFunction(() => {
      const ddl = document.querySelector(
        "#ddlProgram",
      ) as HTMLSelectElement | null;

      if (!ddl) return false;

      // Check if at least one valid option exists (not default "0")
      return Array.from(ddl.options).some(
        (opt) => opt.value && opt.value !== "0",
      );
    });
    
    const programOptions = await page.evaluate(() => {
      const programOption = document.querySelectorAll("#ddlProgram option");

      const programOptionArray: Array<{
        value: string;
        label: string | undefined;
      }> = [];

      programOption.forEach((val, indx) => {
        const value = (val as HTMLOptionElement).value;
        const label = val.textContent?.trim();

        programOptionArray.push({ value, label });
      });
      return programOptionArray;
    });

    return {
      success: true,
      programOptions,
    };
  } catch (error) {
    console.log("ERROR:", error);
    await page.screenshot({
      path: `error-${Date.now()}.jpg`,
      fullPage: true,
    });
    return {
      success: false,
      message: "scraping failed in chossing program",
    };
  } finally {
    await page.close();
  }
};
