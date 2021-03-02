// import sequelize 
import { Sequelize } from "sequelize";
// import connection 
import db from "../config/database";

// init DataTypes
const { DataType } = Sequelize;

// Define schma
const Product = db.define('products', {
    // Define Atribut
    title: {
        type: DataType.STRING
    },
    price: {
        type:DataType.DOUBLE
    }
}, {
    // Mengunci nama table
    freezeTableName: true
});

// export model Product
export default Product;