import request from "supertest";
import app from "../../../src/app";
import mongoose from "mongoose";
import { purchaseModel } from "../../../src/infra/database/models/purchaseModel";

describe("GET /purchases", () => {

  let purchaseId: string;
  let secondPurchaseId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await purchaseModel.deleteMany({});

    const createPurchase = await request(app)
      .post("/checkout")
      .send({
        items: [
          { productId: 1, quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
          { productId: 2, quantity: 2, name: "Mouse Sem Fio Ultra-leve", price: 350 },
        ]
      });

    purchaseId = createPurchase.body.id;

    const createSecondPurchase = await request(app)
      .post("/checkout")
      .send({
        items: [
          { productId: 3, quantity: 3, name: "Teclado Mecânico RGB", price: 550 },
          { productId: 4, quantity: 2, name: "Monitor 4K 27\"", price: 2500 },
        ]
      });

    secondPurchaseId = createSecondPurchase.body.id;
  });

  it("deve retornar todas as compras", async () => {

    const response = await request(app).get("/purchases");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);

    expect(response.body).toMatchObject([
      {
        id: purchaseId,
        date: expect.any(String),
        total: 8200,
        items: [
          { productId: 1, quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
          { productId: 2, quantity: 2, name: "Mouse Sem Fio Ultra-leve", price: 350 },
        ]
      },
      {
        id: secondPurchaseId,
        date: expect.any(String),
        total: 6650,
        items: [
          { productId: 3, quantity: 3, name: "Teclado Mecânico RGB", price: 550 },
          { productId: 4, quantity: 2, name: "Monitor 4K 27\"", price: 2500 },
        ]
      }
    ]);
  });
});