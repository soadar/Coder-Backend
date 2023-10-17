import log from "../../../utils/logger.js";

export default class MySQLDao {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const response = await this.model.findAll();
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    async getById(id) {
        try {
            const response = await this.model.findOne({
                where: {
                    id
                }
            });
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    async update(id, obj) {
        try {
            await this.model.update(obj, {
                where: {
                    id
                }
            });
            return obj;
        } catch (error) {
            log.fatal(error.message);
        }
    }

    async delete(id) {
        try {
            const response = await this.model.destroy({
                where: {
                    id
                }
            });
            return response;
        } catch (error) {
            log.fatal(error.message);
        }
    }
}
