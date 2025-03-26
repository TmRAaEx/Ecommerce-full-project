import { Request, Response } from "express";
import dotenv from "dotenv";
import { db } from "../config/db";

import { logError } from "../utilities/logger";
import { IOrder } from "../models/IOrder";
import { IOrderItem } from "../models/IOrderItem";
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_API_KEY);

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { items, orderID } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [...items],
      mode: "payment",
      ui_mode: "embedded",
      client_reference_id: orderID,
      return_url:
        "http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}",
    });

    res.send({ clientSecret: session.client_secret });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const getSessionStatus = async (req: Request, res: Response) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
  
  res.send({
    status: session.status,
    payment_status: session.payment_status,
    customer_email: session.customer_details.email,
  });
};

export const webHookEvents = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"];

  const endpointSecret = process.env.STRIPE_ENDPOINT_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    throw err;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const { id: payment_id, client_reference_id } = session;
      console.log(client_reference_id);

      try {
        await updateOrder(payment_id, Number(client_reference_id));
        console.log("Order updated succefully!");

        await updateProductStock(payment_id);
        console.log("Item stock updated succefully");
      } catch (err) {
        console.error("Database update failed", err);
        res.status(500).json({ message: logError(err) });
        return;
      }

      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};

const updateOrder = async (payment_id: string, client_reference_id: number) => {
  const query = `
        UPDATE orders 
        SET payment_id = ?, 
        payment_status = 'paid', 
        order_status = 'received' 
        WHERE id = ?;
        `;
  const values = [payment_id, client_reference_id];

  await db.query(query, values);
};

const updateProductStock = async (payment_id: string) => {
  const getOrderData = `SELECT id FROM orders WHERE payment_id = ?`;

  const [rows] = await db.query<IOrder[]>(getOrderData, [payment_id]);

  const orderID = rows[0].id;

  const orderItems = await getOrderItems(orderID);

  if (orderItems.length === 0) return;

  const productIDs = orderItems.map((item) => item.product_id);

  const caseStatements = orderItems
    .map(() => `WHEN id = ? THEN stock - ?`)
    .join(" ");

  const values = orderItems.flatMap((item) => [item.product_id, item.quantity]);

  const query = `
    UPDATE products
    SET stock = CASE ${caseStatements} 
    END
    WHERE id IN (${[...productIDs]});
  `;

  await db.query(query, values);
};

const getOrderItems = async (orderID: IOrder["id"]) => {
  const getOrderItems = `SELECT * FROM order_items WHERE order_id = ?`;

  const [rows] = await db.query<IOrderItem[]>(getOrderItems, [orderID]);

  return rows;
};
