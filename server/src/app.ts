import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import browserRouter from "./routes/browser.routes";
import { Request,Response } from "express";
const app = express();

//Middleware
app.use(cors()); // it helps to connect or make communication between the frontend and backend
app.use(express.json());

app.use("/",(req:Request, res:Response)=>{
try {
    res.send("Backend is running")
} catch (error) {
    res.status(500).send("Something went wrong")
}
})

app.use("/api", healthRouter);
app.use("/api",browserRouter);

export default app;
