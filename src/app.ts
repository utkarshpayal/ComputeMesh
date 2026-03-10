import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes";
import providerRoutes from "./routes/provider.routes";
import { errorHandler } from "./middlewares/error.middleware";
import nodeRoutes from "./routes/node.routes";
import jobRoutes from "./routes/job.routes";

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    message: "Server running after deployment",
  });
});


app.use("/auth", authRoutes);
app.use("/providers", providerRoutes);
app.use("/nodes", nodeRoutes);
app.use("/jobs", jobRoutes);
app.use(errorHandler);

export default app;