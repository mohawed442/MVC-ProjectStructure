import express from "express";
import { loginSchema } from "../validators/auth.validator.js";
import { login } from "../controllers/auth.controller.js";
import validate from "../middlewares/validate.middleware.js";

const router = express.Router();

router.post("/login",validate(loginSchema, "body"), login);

export default router;
