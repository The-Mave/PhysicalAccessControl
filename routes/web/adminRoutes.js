import express from "express";
import bodyParser from "body-parser"
import adminController from "../../controllers/web/adminController.js"

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
router.use(urlencodedParser);

router
    .get("/admin/dashboard", adminController.dashboard)

    .get("/admin/attendances", adminController.adminGetAttendances)
    .get("/admin/classrooms", adminController.adminGetClassrooms)
    .get("/admin/professors", adminController.adminGetProfessors)
    .get("/admin/subjects", adminController.adminGetSubjects)

    .get("/admin/classrooms/edit/:id", adminController.adminUpdateClassrooms)
    .get("/admin/professors/edit/:id", adminController.adminUpdateProfessors)
    .get("/admin/subjects/edit/:id", adminController.adminUpdateSubjects)

    .get("/admin/classrooms/create", adminController.adminCreateClassrooms)
    .get("/admin/professors/create", adminController.adminCreateProfessors)
    .get("/admin/subjects/create", adminController.adminCreateSubjects)

    .get("/admin/attendances/:drt", adminController.adminGetAttendancesByProfessor)

export default router;