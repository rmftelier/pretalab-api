import request from "supertest";
import mongoose from "mongoose";
import app from "../../../src/app";
import { purchaseModel } from "../../../src/infra/database/models/purchaseModel";

describe("POST /checkout", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await purchaseModel.deleteMany({});
  });

  it("deve criar uma compra com sucesso", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        items: [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 2 },
        ]
      });

    expect(response.status).toBe(201);

    expect(response.body).toMatchObject({
      id: expect.any(String),
      date: expect.any(String),
      total: 8200,
      items: [
        { productId: 1, quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
        { productId: 2, quantity: 2, name: "Mouse Sem Fio Ultra-leve", price: 350 }
      ],
    });

  });

  it("deve retornar erro 400 se o total da compra passar R$20.000", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        items: [
          { id: 4, quantity: 9 }
        ]
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "O valor total da compra excede o limite de R$20.000."
    })

  });
});
