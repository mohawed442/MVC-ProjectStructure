import { signup } from "../controllers/auth.controller.js";

import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { signupSchema } from "../validators/auth.validator.js";
const router = express.Router();


router.post("/signup", validate(signupSchema, "body") , signup);

export default router;
