
import express from "express";
const router = express.Router();

router.post("/login",validate(loginSchema, "body"), login);

export default router;
