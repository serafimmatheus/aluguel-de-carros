import { app } from ".";
import { AppDataSource } from "./data-source";
import * as dotenv from "dotenv";

dotenv.config();

AppDataSource.initialize()
  .then(() => {
    console.log("Servir is Running");

    const PORT = process.env.PORT ?? 5000;

    app.listen(PORT, () => {
      console.log(`App rodando \nhttp://localhost:${PORT}/`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
