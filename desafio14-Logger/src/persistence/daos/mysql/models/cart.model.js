import { DataTypes } from "sequelize";
import { db } from "../connection.js";
import { ProductModel } from "./product.model.js";

export const CartModel = db.define('carts', {
    products: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        references: {
            model: ProductModel,
            key: 'id',
        }
    },
    quantity: {
        type: DataTypes.NUMBER,
        allowNull: false,
    },

});