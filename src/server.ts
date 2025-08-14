import { connectToMongo } from "./infra/database/mongoConnect";
import app from "./index";

const URL = process.env.MONGO_DB_URL || 'undefined';
const PORT = process.env.PORT;

connectToMongo(URL).then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port 3000");
  });
});