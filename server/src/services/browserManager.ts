import puppeteer, { Browser } from "puppeteer";

let browser: Browser;

export const initBrowser = async () => {
  try {
    browser = await puppeteer.launch({
      headless: true, // Use "new" if on a very recent puppeteer version
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--single-process", // Helps with memory on Render free tier
        "--no-zygote", // Prevents ghost processes
      ],
    });

    console.log("Browser initialized successfully");
  } catch (error) {
    console.error("Failed to initialize browser:", error);
    throw error;
  }
};

export const getBrowser = () => {
  if (!browser) {
    throw new Error("Browser not initialized. Call initBrowser() first.");
  }
  return browser;
};
