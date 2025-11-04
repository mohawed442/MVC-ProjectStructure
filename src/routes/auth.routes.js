
import { signup , login} from "../controllers/auth.controller.js";

import express from "express";
import { validate } from "../middlewares/validate.middleware.js";
import { loginSchema, signupSchema} from "../validators/auth.validator.js";


const router = express.Router();

router.post("/signup", validate(signupSchema, "body") , signup);
router.post("/login",validate(loginSchema, "body"), login);

export default router;
