import { Purchase, PurchaseItem } from "../../src/models/Purchase";
import { PurchaseService } from "../../src/services/purchases";
import { PurchaseRepository } from "../../src/repositories/PurchaseRepository";

describe("PurchaseService", () => {
  let repositoryMock: jest.Mocked<PurchaseRepository>;
  let service: PurchaseService;

  beforeEach(() => {
    repositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn()
    };

    service = new PurchaseService(repositoryMock);
  });

  it("deve retornar todas as compras", async () => {
    const fakePurchases: Purchase[] = [
      {
        id: "1",
        date: "2025-08-19T15:00:00.000Z",
        total: 5200,
        items: [
          { productId: "101", name: "Notebook", price: 5000, quantity: 1 },
          { productId: "102", name: "Mouse", price: 200, quantity: 1 },
        ],
      },
      {
        id: "2",
        date: "2025-08-19T16:00:00.000Z",
        total: 350,
        items: [{ productId: "103", name: "Teclado", price: 350, quantity: 1 }],
      },
    ];

    repositoryMock.findAll.mockResolvedValue(fakePurchases);

    const purchases = await service.getAll();

    expect(purchases).toEqual(fakePurchases);
  });

  it("deve retornar uma compra por ID", async () => {
    const fakePurchase: Purchase = {
      id: "1",
      date: "2025-08-19T15:00:00.000Z",
      total: 5200,
      items: [
        { productId: "101", name: "Notebook", price: 5000, quantity: 1 },
        { productId: "102", name: "Mouse", price: 200, quantity: 1 },
      ],
    };

    repositoryMock.findById.mockResolvedValue(fakePurchase);

    const purchase = await service.getById("1");

    expect(purchase).toEqual(fakePurchase);

  });

  it("deve lançar erro se a compra não for encontrada", async () => {
    repositoryMock.findById.mockResolvedValue(null);

    await expect(service.getById("999")).rejects.toThrow("Purchase not found");
  });

  it("deve processar checkout corretamente com total válido", async () => {
    const items: PurchaseItem[] = [
      { productId: "123", quantity: 1, name: "Notebook", price: 5000 },
      { productId: "456", quantity: 2, name: "Monitor", price: 300 }
    ];

    const mockPurchase = { id: "1234", total: 5600, items };

    repositoryMock.create.mockResolvedValue(mockPurchase as Purchase);

    const result = await service.checkout(items);

    expect(result.total).toBe(5600);
    expect(repositoryMock.create).toHaveBeenCalledWith({ total: 5600, items });
  });

  it("deve lançar erro se total ultrapassar R$20.000", async () => {
    const items: PurchaseItem[] = [
      { productId: "789", quantity: 1, name: "Servidor Caríssimo", price: 25000 }
    ];

    await expect(service.checkout(items))
      .rejects
      .toThrow("O valor total da compra excede o limite de R$20.000.");

    expect(repositoryMock.create).not.toHaveBeenCalled();
  });

});
