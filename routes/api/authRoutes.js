import express from "express";
import bodyParser from "body-parser"
import authController from "../../controllers/api/authController.js";
 
const router = express.Router();
const jsonParser = bodyParser.json()
router.use(jsonParser);


router
    .get('/profile/:id', jsonParser, authController.perfilUser)
    .get('/login', jsonParser, authController.login)
    .post('/login', jsonParser, authController.loginUser)
    .get('/register', jsonParser, authController.registrar)
    .get('/logout',jsonParser, authController.logout)

 export default router;