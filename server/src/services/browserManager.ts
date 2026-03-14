import puppeteer, { Browser } from "puppeteer";

let browser: Browser;
export const initBrowser = async () => {
  const isProd = process.env.NODE_ENV === "production";
  try {
    browser = await puppeteer.launch({
      headless: isProd ? true : false, // Use modern shell locally
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--window-size=1920,1080",
      ],
      defaultViewport: { width: 1920, height: 1080 },
    });
    console.log("Browser initialized");
  } catch (error) {
    console.error("Init Error:", error);
  }
};

export const getBrowser = () => {
  if (!browser) {
    throw new Error("Browser not initialized. Call initBrowser() first.");
  }
  return browser;
};
