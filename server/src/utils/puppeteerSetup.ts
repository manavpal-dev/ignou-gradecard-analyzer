import { getBrowser } from "../services/browserManager";

export const createPage = async () => {
  const browser = getBrowser();
  const page = await browser.newPage();

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
      resourceType === "media" ||
      resourceType === "stylesheet"
    ) {
      request.abort();
    } else {
      request.continue();
    }
  });

 return page;
}