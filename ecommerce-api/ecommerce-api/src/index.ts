import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(cors());

app.use("/checkout", checkoutRouter); //to make the middleware work properly json makes it not raw format
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

// Attempt to connect to the database
connectDB();
// Start Express server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
});
