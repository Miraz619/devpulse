import { Router } from "express";
import { authController } from "./authentication.controller";
import { log } from "node:console";

const router=Router();



router.post('/signup', authController.createUser )

router.post('/login', authController.loginUser)



export const authRouter=router;
