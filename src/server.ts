import app from "./index";
import { connectToMongo } from "./infra/database/mongoConnect";

const URL = process.env.MONGO_URL || 'undefined';

(async () => {
  try {
    await connectToMongo(URL);
    app.listen(3000, () => {
      console.log(`🚀 Server is running on port 3000`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
})();