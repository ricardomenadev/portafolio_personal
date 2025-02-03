import express from "express";
import {
  createContact,
  
} from "../controllers/contactControllers.js";

const router = express.Router();

router.post("/", createContact);
// router.get("/", getContacts);

export default router;
