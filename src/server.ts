import app from "./index";
import { connectToMongo } from "./infra/database/mongoConnect";

const URL = process.env.MONGO_URL || 'undefined';
const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await connectToMongo(URL);
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:", error);
    process.exit(1);
  }
})();