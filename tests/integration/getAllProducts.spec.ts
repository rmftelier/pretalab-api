import request from "supertest";
import app from "../../src/index";
import { products } from "../../src/models/Product";

describe("GET /products", () => {

  it("deve retornar todos os produtos", async () => {

    const response = await request(app).get(`/products`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(7);

    expect(response.body).toEqual(products);
  });

});





