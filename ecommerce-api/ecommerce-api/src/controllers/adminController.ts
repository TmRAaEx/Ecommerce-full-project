import { Request, Response } from "express";
import { db } from "../config/db";
import { IAdmin } from "../models/IAdmin";
import { logError } from "../utilities/logger";
import bcrypt from "bcrypt";
import { ResultSetHeader } from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const getAdmins = async (_: any, res: Response) => {
  try {
    const query = "SELECT id, username FROM admins";
    const [rows] = await db.query<IAdmin[]>(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const createAdmin = async (req: Request, res: Response) => {
  const { username, password }: IAdmin = req.body;

  const admin_api_key = process.env.ADMIN_KEY;

  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== admin_api_key) {
    console.log("womp womp");

    return res.status(403).json({ error: "Forbidden: Invalid API Key" });
  }

  try {
    const saltrounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltrounds);

    const query = `
        INSERT INTO admins (username, password)
        VALUES (?, ?)`;

    const queryValues = [username, hashedPassword];

    const [ResultSetHeader] = await db.query<ResultSetHeader>(
      query,
      queryValues
    );

    res.status(201).json({
      message: "Admin created",
      insertedID: ResultSetHeader.insertId,
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      res.status(500).json({ error: "User already exists!" });
      return;
    }

    console.error(error);
    res.status(500).json({ error: logError(error) });
  }
};

export const loginAdmin = async (req: Request, res: Response) => {
  const { username, password }: IAdmin = req.body;

  try {
    const getUser = `SELECT * FROM admins WHERE username = ?`;
    const [rows] = await db.query<IAdmin[]>(getUser, [username]);

    if (rows.length === 0) {
      res.status(403).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(403).json({ success: false, message: "Invalid credentials" });
      return;
    }

    res.status(200).json({ success: true, user: user.username });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};
