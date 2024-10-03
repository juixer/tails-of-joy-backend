import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { AuthControllers } from "./auth.controllers";

const router = express.Router();

router.post(
  "/login",
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.login
);

router.post(
  "/register",
  validateRequest(AuthValidation.registerUserValidationSchema),
  AuthControllers.registerUser
);

export const AuthRoutes = router;
