import { Router } from "express";
import { LogIn, Register } from "../controllers/UserController";

const router = Router()

router.post('/post/sig-up', LogIn)

router.post('/post/sing-in', Register)


export default router