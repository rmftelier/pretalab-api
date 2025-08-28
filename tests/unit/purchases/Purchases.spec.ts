import { PurchaseInputDTO, PurchaseResponseDTO } from "../../../src/domain/models/Purchase";
import { PurchaseService } from "../../../src/app/services/PurchaseService";
import { PurchaseRepository } from "../../../src/domain/repositories/PurchaseRepository";
import { Product } from "../../../src/domain/models/Product";

describe("PurchaseService", () => {
  let repositoryMock: jest.Mocked<PurchaseRepository>;
  let service: PurchaseService;
  let productService: { getAll: jest.Mock<Promise<Product[]>, []> };

  beforeEach(() => {
    repositoryMock = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn()
    };

    productService = {
      getAll: jest.fn()
    };


    service = new PurchaseService(repositoryMock, productService as any);
  });

  it("deve retornar todas as compras", async () => {

    const fakePurchases: PurchaseResponseDTO[] = [
      {
        id: "1",
        date: "2025-08-19T15:00:00.000Z",
        total: 8200,
        items: [
          { productId: "1", quantity: 1, name: "Notebook Gamer Pro", price: 7500 },
          { productId: "2", quantity: 2, name: "Mouse Sem Fio Ultra-leve", price: 350 },
        ]
      },
      {
        id: "2",
        date: "2025-08-19T16:00:00.000Z",
        total: 6650,
        items: [
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

    const fakePurchase: PurchaseResponseDTO = {
      id: "1",
      date: "2025-08-19T15:00:00.000Z",
      total: 7500,
      items: [
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

    productService.getAll.mockResolvedValue([
      { id: "1", name: "Notebook Gamer Pro", price: 7500 }
    ]);

    const data: PurchaseInputDTO = {
      cart: [
        {
          productId: "1",
          quantity: 8
        }
      ]
    }

    await expect(service.checkout(data))
      .rejects
      .toThrow("O valor total da compra excede o limite de R$20.000.");

    expect(repositoryMock.create).not.toHaveBeenCalled();
  });

});
