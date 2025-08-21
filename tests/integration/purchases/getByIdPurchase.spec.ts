import request from "supertest";
import app from "../../../src/app";
import mongoose from "mongoose";
import { purchaseModel } from "../../../src/infra/database/models/purchaseModel";
import { products } from "../../../src/domain/models/Product";
import { Types } from "mongoose";

describe("GET /purchases/:id", () => {

  let purchaseId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await purchaseModel.deleteMany({});

  });


  it("deve retornar uma compra com o id correspondente", async () => {

    const createPurchase = await request(app)
      .post("/checkout")
      .send({
        items: [
          { id: 1, quantity: 1 },
          { id: 2, quantity: 2 },
        ]
      });

    purchaseId = createPurchase.body.id;

    const response = await request(app).get(`/purchases/${purchaseId}`);

    expect(response.status).toBe(200);

    expect(response.body).toMatchObject({
      purchase: {
        id: purchaseId,
        date: expect.any(String),
        total: 8200,
        items: [
          { productId: 1, quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
          { productId: 2, quantity: 2, name: "Mouse Sem Fio Ultra-leve", price: 350 },
        ]
      }
    });
  });

  it("deve retornar o erro 404 quando uma compra não é encontrada", async () => {
    const fakeId = new Types.ObjectId();

    const response = await request(app).get(`/purchases/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Purchase not found" });
  });

});
