import { Express } from "express";
import { routes as userRoutes } from "./users.routes";

export const initApp = (app: Express) => {
  app.use("/api", userRoutes);
};
