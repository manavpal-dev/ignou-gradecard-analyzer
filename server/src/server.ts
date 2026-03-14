import "dotenv/config";
import app from "./app";
import { initBrowser } from "./services/browserManager";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initBrowser();
  } catch (error) {
    console.error("Browser initialization failed, continuing without prewarm:", error);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
  });
};

startServer();