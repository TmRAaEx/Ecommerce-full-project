import { db } from "../config/db";
import { ICustomer } from "../models/ICustomer";
import { ResultSetHeader } from "mysql2";

const getCustomers = async (): Promise<ICustomer[]> => {
  try {
    const sql = "SELECT * FROM customers";
    const [rows] = await db.query<ICustomer[]>(sql);
    return rows;
  } catch (error) {
    throw error;
  }
};

const getCustomerById = async (
  id: ICustomer["id"]
): Promise<ICustomer | false> => {
  try {
    const sql = "SELECT * FROM customers WHERE id = ?";
    const [rows] = await db.query<ICustomer[]>(sql, [id]);

    return rows && rows.length > 0 ? rows[0] : false;
  } catch (error) {
    throw error;
  }
};

const getCustomerByEmail = async (
  email: ICustomer["email"]
): Promise<ICustomer | false> => {
  try {
    const sql = "SELECT * FROM customers WHERE email = ?";
    const values = [email];
    const [rows] = await db.query<ICustomer[]>(sql, values);

    return rows && rows.length > 0 ? rows[0] : false;
  } catch (error) {
    throw error;
  }
};

const createCustomer = async (
  customer: ICustomer
): Promise<ICustomer["id"]> => {
  const customerData = Object.values(customer);
  customerData.shift(); //removes id

  try {
    const sql = `
      INSERT INTO customers (firstname, lastname, email, phone, street_address, postal_code, city, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query<ResultSetHeader>(sql, customerData);
    return result.insertId;
  } catch (error) {
    throw error;
  }
};

const updateCustomer = async (
  customer: ICustomer,
  id: string
): Promise<void> => {
  const customerData = Object.values(customer);
  customerData.push(id); // Add the id at the end for the WHERE clause

  try {
    const sql = `
      UPDATE customers 
      SET firstname = ?, lastname = ?, email = ?, password = ?, phone = ?, street_address = ?, postal_code = ?, city = ?, country = ?
      WHERE id = ?
    `;
    const [result] = await db.query<ResultSetHeader>(sql, customerData);

    if (result.affectedRows === 0) {
      throw new Error("Customer not found");
    }
  } catch (error) {
    throw error;
  }
};

const deleteCustomer = async (id: ICustomer["id"]): Promise<number> => {
  try {
    const sql = "DELETE FROM customers WHERE id = ?";
    const [result] = await db.query<ResultSetHeader>(sql, [id]);

    return result.affectedRows;
  } catch (error) {
    throw error;
  }
};

export {
  getCustomers,
  getCustomerById,
  getCustomerByEmail,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
