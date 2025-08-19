import request from "supertest";
import app from "../../src/index";
import mongoose from "mongoose";
import { purchaseModel } from "../../src/infra/database/models/purchaseModel";
import { productModel } from "../../src/infra/database/models/productModel";
import { Types } from "mongoose";

describe("GET /purchases/:id", () => {
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

  it("should return a purchase by ID", async () => {
    const purchase = await purchaseModel.findOne({});
    const response = await request(app).get(`/purchases/${purchase!._id}`);

    expect(response.status).toBe(200);
    expect(response.body.purchase).toMatchObject({
      id: purchase!._id.toString(),
      total: 5200,
    });
  });


  it("should return a 404 when transaction is not found", async () => {
    const fakeId = new Types.ObjectId();

    const response = await request(app).get(`/purchases/${fakeId}`);
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Purchase not found" });
  });

});
