import { createPage } from "../utils/puppeteerSetup";

export const programService = async () => {
  const page = await createPage();

  try {
    await page.goto("https://gradecard.ignou.ac.in/gradecard/login.aspx", {
      waitUntil: "domcontentloaded", // networkidle2 --> Wait until network is quiet
      timeout: 20000,
    });


  } catch (error) {
    
  }
};
