import { Purchase } from "../../../src/domain/models/Purchase";
import { PurchaseService } from "../../../src/app/services/PurchaseService";
import { PurchaseRepository } from "../../../src/domain/repositories/PurchaseRepository";

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
        total: 8200,
        cart: [
          { productId: "1", quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
          { productId: "2", quantity: 2, name: "Mouse Sem Fio Ultra-leve", price: 350 },
        ]
      },
      {
        id: "2",
        date: "2025-08-19T16:00:00.000Z",
        total: 6650,
        cart: [
          { productId: "3", quantity: 3, name: "Teclado Mecânico RGB", price: 550 },
          { productId: "4", quantity: 2, name: "Monitor 4K 27\"", price: 2500 },
        ]
      }
    ]

    repositoryMock.findAll.mockResolvedValue(fakePurchases);

    const purchases = await service.getAll();

    expect(purchases).toMatchObject(fakePurchases);
  });


  it("deve retornar uma compra por ID", async () => {

    const fakePurchase: Purchase = {
      id: "1",
      date: "2025-08-19T15:00:00.000Z",
      total: 7500,
      cart: [
        { productId: "1", quantity: 1, name: "Notebook Gamer Pro", price: 7500 }
      ]
    };

    repositoryMock.findById.mockResolvedValue(fakePurchase);

    const purchase = await service.getById("1");

    expect(purchase).toMatchObject(fakePurchase);

  });

  it("deve lançar erro se a compra não for encontrada", async () => {
    repositoryMock.findById.mockResolvedValue(null);

    await expect(service.getById("999")).rejects.toThrow("Compra com o id informado não foi encontrada.");
  });

  it("deve lançar erro se total ultrapassar R$20.000", async () => {

    const data = {
      cart: [
        {
          productId: "1",
          quantity: 8,
          name: "Notebook Gamer Pro",
          price: 7500
        }
      ]
    }

    await expect(service.checkout(data))
      .rejects
      .toThrow("O valor total da compra excede o limite de R$20.000.");

    expect(repositoryMock.create).not.toHaveBeenCalled();
  });

});
