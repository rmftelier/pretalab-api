import request from "supertest";
import app from "../../../src/app";
import mongoose from "mongoose";
import { purchaseModel } from "../../../src/infra/database/models/purchaseModel";
import { Types } from "mongoose";

describe("GET /purchases/:id", () => {

  let purchaseId: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL!);
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
        "cart": [
          {
            "productId": "3",
            "quantity": 2,
            "name": "Teclado Mecânico RGB",
            "price": 550
          },
          {
            "productId": "4",
            "quantity": 3,
            "name": "Monitor 4K 27\"",
            "price": 2500
          }
        ]
      });

    purchaseId = createPurchase.body.id;

    const response = await request(app).get(`/purchases/${purchaseId}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      purchase: {
        id: purchaseId,
        date: expect.any(String),
        total: 8600,
        cart: [
          { productId: "3", quantity: 2, name: "Teclado Mecânico RGB", price: 550 },
          { productId: "4", quantity: 3, name: "Monitor 4K 27\"", price: 2500 },
        ]
      }
    });

    const savedPurchase = await purchaseModel.findById(purchaseId).lean();
    expect(savedPurchase).toMatchObject({
      _id: expect.any(mongoose.Types.ObjectId),
      date: expect.any(Date),
      total: 8600,
      cart: expect.any(Array),
    });


  });

  it("deve retornar o erro 404 quando uma compra não for encontrada", async () => {
    const fakeId = new Types.ObjectId();

    const response = await request(app).get(`/purchases/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body).toMatchObject({ message: "Compra com o id informado não foi encontrada." });
  });

});
