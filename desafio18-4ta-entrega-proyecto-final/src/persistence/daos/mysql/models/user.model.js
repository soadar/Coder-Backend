import { DataTypes } from "sequelize";
import { db } from "../connection.js";

export const UserModel = db.define('users', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    age: {
        type: DataTypes.NUMBER,
        allowNull: false,
        defaultValue: 0,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cart: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "user",
    },
    isGitHub: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
});