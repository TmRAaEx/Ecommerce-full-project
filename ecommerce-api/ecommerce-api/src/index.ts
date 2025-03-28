import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import cors from "cors";
import cron from "node-cron"; // Import node-cron package
import { deleteOrder, getOrders } from "./services/orderService";
import moment from "moment";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";
import adminRouter from "./routes/admins";
import checkoutRouter from "./routes/checkout";

app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/order-items", orderItemRouter);
app.use("/admin", adminRouter);
app.use("/checkout", checkoutRouter);

// Connect to the database
connectDB();

cron.schedule("0 * * * *", async () => {
  console.log("Cron job running every hour");

  try {
    const orders = await getOrders();
    const currentTime = moment();

    // Find orders that are over an hour old and have a "pending" status
    const outdatedOrderIds = orders
      .filter((order) => {
        const orderCreatedAt = moment(order.created_at);
        return (
          currentTime.diff(orderCreatedAt, "hours") > 1 &&
          order.order_status === "pending"
        );
      })
      .map((order) => order.id);
    console.log(
      "Outdated order IDs (created more than an hour ago):",
      outdatedOrderIds
    );

    // Use Promise.all to delete all outdated orders
    if (outdatedOrderIds.length > 0) {
      await Promise.all(outdatedOrderIds.map((id) => deleteOrder(id)));
      console.log(
        `Successfully deleted ${outdatedOrderIds.length} outdated orders.`
      );
    } else {
      console.log("No outdated orders to delete.");
    }
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});

// Start the Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
