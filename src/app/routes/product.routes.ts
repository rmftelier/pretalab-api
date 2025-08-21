import { DataProductRepository } from "../../infra/database/repositories/DataProductRepository";
import { ProductService } from "../services/ProductService";
import { ProductController } from "../controllers/ProductController";
import { Router } from "express";

const router = Router();

const repository = new DataProductRepository();
const service = new ProductService(repository);
const controller = new ProductController(service);

router.get("/products", (_req, res) =>
  controller.getAllProducts(_req, res));

export { router as productRoutes }
