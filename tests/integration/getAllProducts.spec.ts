import request from "supertest";
import app from "../../src/index";
import mongoose from "mongoose";
import { productModel } from "../../src/infra/database/models/productModel";

describe("GET /products", () => {

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URL_TEST!);

  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await productModel.deleteMany({});
    await productModel.create([
      { name: "Monitor", price: 899 },
      { name: "Teclado", price: 199 },
    ]);
  });

  it("should return all the products", async () => {

    const response = await request(app).get(`/products`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Monitor", price: 899 }),
        expect.objectContaining({ name: "Teclado", price: 199 }),
      ])
    );
  });

});





