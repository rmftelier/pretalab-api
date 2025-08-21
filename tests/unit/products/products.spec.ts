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

    const mockProducts: Product[] =
      [
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

    repositoryMock.findAll.mockResolvedValue(mockProducts);

    const correspondingProducts = await service.getAll();

    expect(correspondingProducts).toMatchObject(mockProducts);
  });

});

