import express from "express";
import cors from "cors";
import healthRouter from "./routes/health.routes";
import resultRouter from "./routes/result.routes";
import categoriesRouter from "./routes/categories.routes";
import programRouter from "./routes/programs.routes";
const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://ignou-gradecard-analyzer.vercel.app"
];
//Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests without origin
      if (!origin) {
        return callback(null, true);
      }

      // allow localhost + production
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
); // it helps to connect or make communication between the frontend and backend
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "IGNOU GradeCard API is running",
    health: "/api/health",
  });
});

app.use("/api", healthRouter);

app.use("/api", programRouter);
app.use("/api", categoriesRouter);
app.use("/api", resultRouter);

export default app;
