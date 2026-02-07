import { Router } from "express";
import { login, logout, register, welcome } from "../controllers/userController.js";
import { protect } from "../middlewares/protect.js";

const userRouter= Router();

userRouter.post("/register", register);
userRouter.post("/login",login);
userRouter.get("/welcome",protect,welcome);
userRouter.post("/logout",logout);

export default userRouter;