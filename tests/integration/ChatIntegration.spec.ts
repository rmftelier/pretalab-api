import request from "supertest";
import app from "../../src/app";
import mongoose from "mongoose";
import { transactionModel } from "../../src/infra/database/models/transactionModel";
import { chatModel } from "../../src/infra/database/models/chatModel";

describe("ChatService - Integração", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await chatModel.deleteMany({});
    await transactionModel.deleteMany({});
  });

  it("deve gerar resposta do assistente financeiro e salvar no histórico", async () => {

    await transactionModel.create({
      id: "1",
      date: "2024-07-15T10:00:00.000Z",
      description: "Salário de Agosto",
      amount: 5000,
      type: "income",
      category: "Salário"
    });

    const response = await request(app)
      .post("/chat")
      .send({ message: "Me mostre o resumo financeiro do mês" })
      .expect(200);

    expect(response.body).toMatchObject({
      reply: {
        response: expect.any(String),
        context: [
          {
            role: "user",
            text: "Me mostre o resumo financeiro do mês"
          },
          {
            role: "model",
            text: expect.any(String) 
          }
        ]
      }
    });

    const messages = await chatModel.find().lean();

    expect(messages).toMatchObject([
      {
        context: [
          { role: "user", text: "Me mostre o resumo financeiro do mês" },
          { role: "model", text: expect.any(String) }
        ],
        createdAt: expect.any(Date)
      }
    ]);
  });

});
