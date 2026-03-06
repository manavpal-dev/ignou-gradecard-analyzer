import "dotenv/config";
import app from "./app";
import { initBrowser } from "./services/browserManager";

const PORT = 5000;

const startServer = async () => {
  try {
    await initBrowser(); // start puppeteer once
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:",error);
    process.exit(1);
  }
};

startServer();