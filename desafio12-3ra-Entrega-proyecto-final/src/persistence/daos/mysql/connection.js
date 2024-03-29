import { Sequelize } from 'sequelize';
import config from '../../../../config.js';

export const db = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
    host: config.DB_HOST,
    dialect: 'mysql'
});

export const initMySqlDB = async () => {
    try {
        await db.sync({ force: false });
        console.log('Conectado a la base de datos de MYSQL');
    } catch (error) {
        console.log(error);
    }
};