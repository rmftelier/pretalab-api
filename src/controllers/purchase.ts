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


    try {
      const purchase = await this.service.getById(id);
      return res.status(200).json({ purchase });

    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }

  };

  async createPurchase(req: Request, res: Response) {
    const { items } = req.body;

    try {
      const purchase = await this.service.checkout(items);
      return res.status(201).json(purchase);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }

  };

};