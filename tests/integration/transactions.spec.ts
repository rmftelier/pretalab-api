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

describe("POST /transactions", () => {

  it("should return a transaction when created", async () => {

    const newTransaction = {
      id: "12",
      date: "2024-08-02T15:00:00Z",
      description: "Consulta Médica",
      amount: 100,
      type: "income",
      category: "Saúde"
    }

    const response = await request(app).post("/transactions/").send(newTransaction);

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({ transaction: newTransaction });

  });

});