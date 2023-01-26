import { Router } from "express";
import * as controller from "../controllers/photoController.js";

export const register = async () => {

}

export const login = async () => {
    
}
const router = Router();

router    
    .post("/register", validate(postSchema), controller.createPhoto)
    .post("/login", validate(postSchema), controller.createPhoto);

export default router;

// validate with 3 diff schema allows to validate correct input
