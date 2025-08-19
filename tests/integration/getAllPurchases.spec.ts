import request from "supertest";
import app from "../../src/index";
import mongoose from "mongoose";
import { purchaseModel } from "../../src/infra/database/models/purchaseModel";
import { productModel } from "../../src/infra/database/models/productModel";

describe("GET /purchases", () => {
  let product1Id: string;
  let product2Id: string;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Limpar coleções
    await purchaseModel.deleteMany({});
    await productModel.deleteMany({});

    // Criar produtos de teste
    const products = await productModel.create([
      { name: "Notebook", price: 5000 },
      { name: "Mouse", price: 200 },
    ]);

    product1Id = products[0]._id.toString();
    product2Id = products[1]._id.toString();

    // Criar compras de teste
    await purchaseModel.create([
      {
        total: 5200,
        items: [
          {
            productId: products[0]._id,
            name: products[0].name,
            price: products[0].price,
            quantity: 1,
          },
          {
            productId: products[1]._id,
            name: products[1].name,
            price: products[1].price,
            quantity: 1,
          },
        ],
      },
    ]);
  });

  it("should return all purchases", async () => {
    const response = await request(app).get("/purchases");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);

    // Testa que o array contém pelo menos um objeto que bate com o esperado
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          total: 5200,
          items: expect.arrayContaining([
            expect.objectContaining({ name: "Notebook", price: 5000, quantity: 1 }),
            expect.objectContaining({ name: "Mouse", price: 200, quantity: 1 }),
          ]),
        }),
      ])
    );
  });

});