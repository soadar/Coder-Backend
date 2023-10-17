import { DataTypes } from "sequelize";
import { db } from "../connection.js";

export const MessageModel = db.define('messages', {
    username: {
        type: DataTypes.STRING,
    },
    message: {
        type: DataTypes.STRING,
    },
});