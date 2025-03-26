import express from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderByPaymentID,
} from "../controllers/orderController";
const router = express.Router();

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/paymentID/:payment_id", getOrderByPaymentID);
router.post("/", createOrder);
router.patch("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
