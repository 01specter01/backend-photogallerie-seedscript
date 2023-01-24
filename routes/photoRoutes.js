import { Router } from "express";
import * as controller from "../controllers/photoController.js";
import validate from "../middlewares/validate.js";
import { postSchema, getSchema, deleteSchema } from "./photos.schema.js";

const router = Router();

router
    .get("/", validate(getSchema), controller.getAllPhotos)
    .get("/:photoId", controller.getPhoto)
    .post("/", validate(postSchema), controller.createPhoto)
    .patch("/:photoId", controller.updatePhoto)
    .put("/:photoId", controller.replacePhoto)
    .delete("/:photoId", validate(deleteSchema), controller.deletePhoto);

export default router;

// validate with 3 diff schema allows to validate correct input
