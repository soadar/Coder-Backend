import { DataTypes } from "sequelize";
import { db } from "../connection.js";

export const ProductModel = db.define('products', {
    title: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING
    },
    code: {
        type: DataTypes.STRING
    },
    price: {
        type: DataTypes.STRING
    },
    status: {
        type: DataTypes.BOOLEAN
    },
    stock: {
        type: DataTypes.INTEGER
    },
    category: {
        type: DataTypes.STRING
    },
    thumbnails: {
        type: DataTypes.STRING
    }
});