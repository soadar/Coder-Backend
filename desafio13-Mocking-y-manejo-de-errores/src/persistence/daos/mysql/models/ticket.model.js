import { DataTypes } from "sequelize";
import { db } from "../../mysql/connection.js";

export const TicketModel = db.define('tickets', {
    code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    purchase_datetime: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
        allowNull: false,
    },
    amount: {
        type: DataTypes.NUMBER,
        allowNull: false,
        unique: true,
    },
    purchaser: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});