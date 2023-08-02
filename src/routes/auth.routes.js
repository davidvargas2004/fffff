//This file is for las rutas del login y interacion del user
import {Router} from "express";
import {register,login,logout,profile,verifyToken} from "../controllers/auth.controllers.js";
import {funcioncookie} from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {registerSchema,loginSchema } from "../schemas/auth.schema.js";


const router = Router();

router.post('/register',validateSchema(registerSchema), register);
router.post('/login',validateSchema(loginSchema), login);
router.post('/logout', logout);

router.get("/verify",verifyToken);

router.get("/profile",funcioncookie, profile);


export default router;

