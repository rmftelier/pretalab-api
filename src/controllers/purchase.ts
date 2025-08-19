import { Request, Response } from "express";
import { PurchaseService } from "../services/purchases";

export class PurchaseController {
  constructor(private service: PurchaseService) { }

  async getAllPurchases(req: Request, res: Response) {
    const purchases = await this.service.getAll();

    return res.status(200).json(purchases);
  };

  async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;

    const purchase = await this.service.getById(id);

    return res.status(200).json({ purchase });
  };

};