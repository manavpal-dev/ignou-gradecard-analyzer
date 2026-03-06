import puppeteer, {Browser} from "puppeteer";

let browser: Browser;

export const initBrowser = async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ]
  });

  console.log("Browser initialized");
};

export const getBrowser = () => {
  if (!browser) {
    throw new Error("Browser not initialized");
  }
  return browser;
};