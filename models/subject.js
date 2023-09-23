import Sequelize from 'sequelize'
import db from '../config/dbConnect.js'
import Professor from "./professor.js"
import Classroom from "./classroom.js"

const Subject = db.define('subject', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dayOfWeek: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false
    }
})

Subject.belongsTo(Professor, { foreignKey: 'drt_professor' });
Subject.belongsTo(Classroom, { foreignKey: 'id_classroom' });

export default Subject;
