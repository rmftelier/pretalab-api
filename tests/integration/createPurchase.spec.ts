import request from "supertest";
import mongoose from "mongoose";
import app from "../../src/index";
import { purchaseModel } from "../../src/infra/database/models/purchaseModel";
import { productModel } from "../../src/infra/database/models/productModel";

describe("POST /checkout", () => {
  let product1Id: string;
  let product2Id: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await purchaseModel.deleteMany({});

    // Criar produtos de teste
    const product1 = await productModel.create(
      { name: "Notebook", price: 5000 });

    const product2 = await productModel.create(
      { name: "Mouse", price: 200 });

    product1Id = product1._id.toString();
    product2Id = product2._id.toString();
  });

  it("deve criar uma compra com sucesso", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        items: [
          { productId: product1Id, name: "Notebook", price: 5000, quantity: 1 },
          { productId: product2Id, name: "Mouse", price: 200, quantity: 2 }
        ]
      });

    expect(response.status).toBe(201);
    expect(response.body.items.length).toBe(2);

    expect(response.body).toMatchObject({
      items: [
        { name: "Notebook", price: 5000, quantity: 1 },
        { name: "Mouse", price: 200, quantity: 2 }
      ],
      total: 5400
    });
  });

  it("deve retornar erro se total passar de 20.000", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        items: [
          { productId: new mongoose.Types.ObjectId(), name: "Servidor", price: 25000, quantity: 1 }
        ]
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "O valor total da compra excede o limite de R$20.000.");
  });
});
