import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import resultRouter from "./routes/result.routes";
import categoriesRouter from "./routes/categories.routes";
const app = express();

const allowedOrigin = [
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
app.use("/api", categoriesRouter)
app.use("/api", resultRouter);

export default app;
