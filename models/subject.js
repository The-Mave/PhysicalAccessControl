import Sequelize from 'sequelize'
import Professor from "./professor.js"
import Classroom from "./classroom.js"

const Subject = database.define('subject', {
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

Attendance.belongsTo(Professor, { foreignKey: 'drt_professor' });
Attendance.belongsTo(Classroom, { foreignKey: 'id_classroom' });

module.exports = Subject;
