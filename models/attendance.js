import Sequelize from 'sequelize'
import Professor from "./professor.js"
import Subject from "./subject.js"

const Attendance = database.define('attendance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    time: {
        type: Sequelize.TIME,
        allowNull: false
    },
    present: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
})

Attendance.belongsTo(Professor, { foreignKey: 'drt_professor' });
Attendance.belongsTo(Subject, { foreignKey: 'id_subject' });

export default Attendance;
