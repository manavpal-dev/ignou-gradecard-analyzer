import puppeteer, { Browser } from "puppeteer";

let browser: Browser;
export const initBrowser = async () => {
  const isProd = process.env.NODE_ENV === "production";
  if (browser) return;

  try {
    browser = await puppeteer.launch({
      headless: isProd ? true : false, // Use modern shell locally

      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--single-process", // Crucial for Render
        "--disable-dev-shm-usage", // Prevents crashes in Docker/Linux
        "--no-zygote", // Saves RAM
        "--disable-gpu", // Saves CPU
      ],
      defaultViewport: { width: 1920, height: 720 },
    });
    console.log("Browser initialized");
  } catch (error) {
    console.error("Init Error:", error);
    process.exit(1); // Stop the server if browser fails
  }
};

export const getBrowser = () => {
  if (!browser) {
    throw new Error("Browser not initialized. Call initBrowser() first.");
  }
  return browser;
};
