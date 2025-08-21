import app from "./app";
import { connectToMongo } from "./infra/database/mongoConnect";

const URL = process.env.MONGO_URL || 'undefined';

connectToMongo(URL).then(() => {
  app.listen(3000, () => {
    console.log(`🚀 O Servidor está executando na porta 3000`);
  });
})


