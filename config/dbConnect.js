import Sequelize from "sequelize"

const db = new Sequelize('pac_crud', 'pacman', 'pacpassword', {
  dialect: 'mysql',
  host: 'db4free.net',
  port: 3306
}) 

export default db;