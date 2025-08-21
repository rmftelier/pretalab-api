import mongoose from "mongoose";

export async function connectToMongo(URL: string) {
  try {
    await mongoose.connect(URL);
    console.log('🟢 Conectado com sucesso ao MongoDB Atlas');
  } catch (error) {
    console.log(console.log('🔴 Erro ao tentar conexão com o MongoDB Atlas', error));
    process.exit(1);
  }
}
