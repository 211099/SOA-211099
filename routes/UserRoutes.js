import { Router } from "express";
import { LogIn, Register } from "../controllers/UserController.js";
import { ValidationCreateUserAndLogin } from "../validators/User.js";

const router = Router()

router.post('/post/sig-up', ValidationCreateUserAndLogin, LogIn)

router.post('/post/sing-in', ValidationCreateUserAndLogin, Register)


export default router