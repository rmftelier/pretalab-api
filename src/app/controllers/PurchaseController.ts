import { Request, Response } from "express";
import { PurchaseService } from "../services/PurchaseService";

export class PurchaseController {
  constructor(private service: PurchaseService) { }

  public async getAllPurchases(req: Request, res: Response) {
    try {
      const purchases = await this.service.getAll();
      return res.status(200).json(purchases);

    } catch (error: any) {
      return res.status(404).json({ message: error.message })
    }
  };

  public async getPurchaseById(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const purchase = await this.service.getById(id);
      return res.status(200).json({ purchase });

    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }

  };

  public async createPurchase(req: Request, res: Response) {
    const { cart } = req.body;

    try {
      const purchase = await this.service.checkout({ cart });
      return res.status(201).json(purchase);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }

  };

};