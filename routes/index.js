import express from "express"
import attendance from "./api/attendancesRoutes.js"
import classroom from "./api/classroomsRoutes.js"
import professor from "./api/professorsRoutes.js"
import subject from "./api/subjectsRoutes.js"
import auth from "./api/authRoutes.js"
import admin from "./web/adminRoutes.js"
import home from "./web/homeRoutes.js"


const routes = (app) => {

    app.use(
        express.json(),
        auth,
        attendance,
        classroom,
        professor,
        subject,
        admin,
        home
    )
}

export default routes