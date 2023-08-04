import express, { Express } from "express";
import dotenv from "dotenv";
import api from "./routing/api";
import cors from "cors";

dotenv.config();
const app: Express = express();
app.use("/api", cors(), api);
export default app;
