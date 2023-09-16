import express from "express";
import attendanceController from "../../controllers/api/attendancesController.js"

const router = express.Router();

router
    .get("/attendances", attendanceController.readAttendances)
    .post("/attendances",  attendanceController.createAttendance)

export default router;