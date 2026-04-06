import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import browserRouter from "./routes/browser.routes";
const app = express();

const allowedOrigin = [
  "http://localhost:4200",
  "http://localhost:3000",
  "https://ignou-gradecard-analyzer.vercel.app"
]
//Middleware
app.use(
  cors({
    origin: (origin,callback)=>{
      if(!origin || allowedOrigin.includes(origin)){
        callback(null,true);
      }else{
        callback(new Error("Not allowed by CORS"))
      }
    }
  }),
); // it helps to connect or make communication between the frontend and backend
app.use(express.json());

app.use("/api", healthRouter);

app.use("/api", browserRouter);

export default app;
