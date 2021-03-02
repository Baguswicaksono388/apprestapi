// import sequelize
import { Sequelize } from "sequelize";

// create connection
const db = new Sequelize('res_api', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// export connection
export default db;