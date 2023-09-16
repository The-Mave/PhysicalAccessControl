import express from "express";
import subjectController from "../../controllers/api/subjectsController.js"

const router = express.Router();

router
    .get("/subjects", subjectController.readSubjects)
    .get("/subjects/:id",  subjectController.readSubjectById)
    .post("/subjects",  subjectController.createSubject)
    .put("/subjects/:id",  subjectController.updateSubject)
    .delete("/subjects/:id",  subjectController.deleteSubject)

export default router;