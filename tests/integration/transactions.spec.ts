import request from "supertest";
import app from "../../src/index";

describe("GET /transactions/:id", () => {

  it("should return a transaction when ID exists", async () => {
    const response = await request(app).get("/transactions/1");
    expect(response.status).toBe(200);
    expect(response.body.transaction.description).toBe('Salário de Julho');
  });

  it("should return a 404 when transaction is not found", async () => {
    const response = await request(app).get("/transactions/20");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: "Transaction not found" });
  });

});