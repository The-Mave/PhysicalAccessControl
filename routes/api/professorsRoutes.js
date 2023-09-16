import express from "express";
import professorController from "../../controllers/api/professorsController.js"

const router = express.Router();

router
    .get("/professors", professorController.readProfessors)
    .get("/professors/:id",  professorController.readProfessorById)
    .post("/professors",  professorController.createProfessor)
    .put("/professors/:id",  professorController.updateProfessor)
    .delete("/professors/:id",  professorController.deleteProfessor)

export default router;