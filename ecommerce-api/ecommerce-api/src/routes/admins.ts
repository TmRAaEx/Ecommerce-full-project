import { Router } from "express";

import {
  createAdmin,
  getAdmins,
  loginAdmin,
} from "../controllers/adminController";

const router = Router();

router.get("/", getAdmins);
router.post("/register", createAdmin);

router.post("/login", loginAdmin);

export default router;
