import { Request, Response } from "express";
import { ICustomer } from "../models/ICustomer";
import { logError } from "../utilities/logger";

import * as customerService from "../services/customerService";

export const getCustomers = async (_: any, res: Response) => {
  try {
    const customers = await customerService.getCustomers();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const customer = await customerService.getCustomerById(Number(id));

    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const getCustomerByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const customer = await customerService.getCustomerByEmail(email);

    if (!customer) {
      res.status(404).json({ message: "Customer not found" });
      return;
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  const customer: ICustomer = req.body;

  try {
    const createdCustomerID = await customerService.createCustomer(customer);
    res.status(201).json({
      message: "Customer created",
      insertedID: createdCustomerID,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: logError(error) });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const customer: ICustomer = req.body;

  try {
    await customerService.updateCustomer(customer, id);
    res.json({ message: "Customer updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: logError(error) });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const id: string = req.params.id;

  try {
    const deletedRows = await customerService.deleteCustomer(Number(id));

    deletedRows === 0
      ? res.status(404).json({ message: "Customer not found" })
      : res.json({ message: "Customer deleted" });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};
