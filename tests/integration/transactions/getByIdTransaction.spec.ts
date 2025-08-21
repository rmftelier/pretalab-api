import request from "supertest";
import app from "../../../src/app";
import mongoose from "mongoose";
import { transactionModel } from "../../../src/infra/database/models/transactionModel";
import { Types } from "mongoose";

describe("GET /transactions/:id", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await transactionModel.deleteMany({});
  });

  it("deve retornar uma transação correspondente ao id informado", async () => {

    const newTransaction = {
      date: "2024-08-02T15:00:00Z",
      description: "Consulta Médica",
      amount: 100,
      type: "income",
      category: "Saúde"
    };

    const createResponse = await request(app).post("/transactions").send(newTransaction);

    let id = createResponse.body.transaction.id;

    const response = await request(app).get(`/transactions/${id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      transaction: newTransaction
    });
  });

  it("deve retornar um erro 404 quando a transação não é encontrada", async () => {
    const fakeId = new Types.ObjectId();

    const response = await request(app).get(`/transactions/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Transaction not found" });
  });

});

