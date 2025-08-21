import request from "supertest";
import app from "../../../src/app";
import mongoose from "mongoose";
import { transactionModel } from "../../../src/infra/database/models/transactionModel";

describe("POST /transactions", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await transactionModel.deleteMany({});
  });

  it("deve retornar uma transação quando criada", async () => {

    const newTransaction = {
      date: "2024-08-02T15:00:00Z",
      description: "Consulta Médica",
      amount: 100,
      type: "income",
      category: "Saúde"
    }

    const response = await request(app).post("/transactions/").send(newTransaction);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ transaction: newTransaction });

  });

});