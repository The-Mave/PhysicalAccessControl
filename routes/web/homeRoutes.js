import express from "express";
import homeController from "../../controllers/web/homeController.js"

const router = express.Router();

router
    .get("/", homeController.index)
    .get("/perfil", homeController.perfil)

export default router;