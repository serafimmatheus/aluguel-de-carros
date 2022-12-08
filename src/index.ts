import express from "express";
import { initApp } from "./routes/routes";

export const app = express();

app.use(express.json());

initApp(app);
