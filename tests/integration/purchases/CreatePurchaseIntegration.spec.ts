import request from "supertest";
import mongoose from "mongoose";
import app from "../../../src/app";
import { purchaseModel } from "../../../src/infra/database/models/purchaseModel";

describe("POST /checkout", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL!);
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
        "cart": [
          {
            "productId": "3",
            "quantity": 2
          },
          {
            "productId": "4",
            "quantity": 3
          }
        ]
      });

    expect(response.status).toBe(201);


    expect(response.body).toMatchObject({
      id: expect.any(String),
      date: expect.any(String),
      total: 8600,
      items: [
        { productId: "3", quantity: 2, name: "Teclado Mecânico RGB", price: 550 },
        { productId: "4", quantity: 3, name: "Monitor 4K 27\"", price: 2500 }
      ],
    });

    const savedPurchase = await purchaseModel.findById(response.body.id).lean();
    expect(savedPurchase).toMatchObject({
      _id: expect.any(mongoose.Types.ObjectId),
      date: expect.any(Date),
      total: 8600,
      cart: [
        { productId: "3", quantity: 2, name: "Teclado Mecânico RGB", price: 550 },
        { productId: "4", quantity: 3, name: "Monitor 4K 27\"", price: 2500 }
      ]
    });
  });

  it("deve retornar erro 400 se o total da compra passar R$20.000", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        "cart": [
          {
            "productId": "4",
            "quantity": 10
          }
        ]
      });

    expect(response.status).toBe(400);
    expect(response.body).toMatchObject({
      message: "O valor total da compra excede o limite de R$20.000."
    });
  });
});
