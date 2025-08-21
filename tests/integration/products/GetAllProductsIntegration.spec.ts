import request from "supertest";
import app from "../../../src/app";
import nock from "nock";

describe("GET /products", () => {

  it("deve retornar todos os produtos", async () => {

    const mockProducts = {
      data: [
        {
          "id": "1",
          "name": "Notebook Gamer Pro",
          "price": 7500
        },
        {
          "id": "2",
          "name": "Mouse Sem Fio Ultra-leve",
          "price": 350
        },
        {
          "id": "3",
          "name": "Teclado Mecânico RGB",
          "price": 550
        },
        {
          "id": "4",
          "name": "Monitor 4K 27\"",
          "price": 2500
        },
        {
          "id": "5",
          "name": "Headset 7.1 Surround",
          "price": 600
        },
        {
          "id": "6",
          "name": "Webcam Full HD",
          "price": 400
        },
        {
          "id": "7",
          "name": "SSD NVMe 1TB",
          "price": 800
        }
      ]
    }

    nock("https://pretalab-api-439254010866.us-central1.run.app")
      .get("/products")
      .reply(200, mockProducts);

    const response = await request(app).get(`/products`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(mockProducts.data);
  });

});






