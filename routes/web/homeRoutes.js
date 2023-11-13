import express from "express";
import homeController from "../../controllers/web/homeController.js"
import authController from "../../controllers/api/authController.js"

const router = express.Router();

router
    .get("/", authController.checkToken, homeController.index)
    // .get("/perfil", homeController.perfil)
    // .get("/gerar-relatorio", homeController.gerarrelatorios)
    .get("/registro-presenca",authController.checkToken, homeController.registropresenca)

export default router;