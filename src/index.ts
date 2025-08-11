import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import { connectToMongo } from "./infra/database/mongoConnect";
import { transactionsRoutes } from "./routes/routes";

dotenv.config();

const URL = process.env.MONGO_DB_URL || 'undefined';
const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());
app.use(transactionsRoutes);

connectToMongo(URL).then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port 3000");
  });
});

export default app;
