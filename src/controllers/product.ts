import { Request, Response } from "express";
import { ProductService } from "../services/products";

export class ProductController {
  constructor(private service: ProductService) { }

  async getAllProducts(req: Request, res: Response) {
    const products = await this.service.getAll();

    if (!products) {
      return res.status(404).json({ message: "Products not found" });
    }

    return res.status(200).json(products);
  };

}