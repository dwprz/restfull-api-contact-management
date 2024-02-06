import express from "express";
import { publicRouter } from "../routes/public-api.js";
import { errorMiddleware } from "../middlewares/error-middleware.js";
import { router } from "../routes/api.js";

const app = express();

app.use(express.json());
app.use(publicRouter);
app.use(router)
app.use(errorMiddleware);

export default app;
