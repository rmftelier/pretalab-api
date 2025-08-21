import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

export class ProductController {
  constructor(private service: ProductService) { }

  public async getAllProducts(req: Request, res: Response) {

    try {
      const products = await this.service.getAll();
      return res.status(200).json(products);

    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  };

}