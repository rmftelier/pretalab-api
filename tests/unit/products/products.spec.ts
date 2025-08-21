import { Product } from "../../../src/domain/models/Product";
import { ProductService } from "../../../src/app/services/ProductService";
import { ProductRepository } from "../../../src/domain/repositories/ProductRepository";

describe("ProductService", () => {
  let repositoryMock: jest.Mocked<ProductRepository>;
  let service: ProductService;

  beforeEach(() => {
    repositoryMock = {
      findAll: jest.fn(),
    };

    service = new ProductService(repositoryMock);
  });

  it("deve retornar todos os produtos", async () => {
    const fakeProducts: Product[] = [
      {
        id: 1,
        name: "Teclado",
        price: 300
      },
      {
        id: 2,
        name: "Monitor",
        price: 3000
      },
    ];

    repositoryMock.findAll.mockResolvedValue(fakeProducts);

    const correspondingProducts = await service.getAll();

    expect(correspondingProducts).toEqual(fakeProducts);

  });





})