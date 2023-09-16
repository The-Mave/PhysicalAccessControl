import Sequelize from 'sequelize'

const Classroom = database.define('classroom', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    building: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    qrcode: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

export default Classroom;
