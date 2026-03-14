import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import browserRouter from "./routes/browser.routes";
const app = express();

//Middleware
app.use(cors()); // it helps to connect or make communication between the frontend and backend
app.use(express.json());

app.use("/api", healthRouter);
app.use("/api",browserRouter);

export default app;

