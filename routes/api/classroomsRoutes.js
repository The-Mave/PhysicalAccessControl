import express from "express";
import classroomController from "../../controllers/api/classroomsController.js"

const router = express.Router();

router
    .get("/classrooms", classroomController.readClassrooms)
    .get("/classrooms/:id",  classroomController.readClassroomById)
    .post("/classrooms",  classroomController.createClassroom)
    .put("/classrooms/:id",  classroomController.updateClassroom)
    .delete("/classrooms/:id",  classroomController.deleteClassroom)

export default router;