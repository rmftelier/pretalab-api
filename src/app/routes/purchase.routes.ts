import { MongoPurchaseRepository } from "../../infra/database/repositories/MongoPurchaseRepository";
import { PurchaseController } from "../controllers/PurchaseController";
import { PurchaseService } from "../services/PurchaseService";
import { Router } from "express";

const router = Router();

const repository = new MongoPurchaseRepository();
const service = new PurchaseService(repository);
const controller = new PurchaseController(service);

router.get("/purchases", (_req, res) => controller.getAllPurchases(_req, res));
router.get("/purchases/:id", (req, res) => controller.getPurchaseById(req, res));

router.post("/checkout", (req, res) => controller.createPurchase(req, res));

export { router as purchaseRoutes }