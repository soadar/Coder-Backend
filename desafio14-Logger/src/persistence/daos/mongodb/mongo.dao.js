import log from "../../../utils/logger";

export default class MongoDao {
    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const response = await this.model.find({});
            return response;
        } catch (error) {
            log.fatal(error)
        }
    }

    async getById(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            log.fatal(error)
        }
    }

    async create(obj) {
        try {
            const response = await this.model.create(obj);
            return response;
        } catch (error) {
            log.fatal(error)
        }
    }

    async update(id, obj) {
        try {
            //await this.model.updateOne({ _id: id }, obj);
            const updateProd = await this.model.findByIdAndUpdate(id, { obj });
            return updateProd;
        } catch (error) {
            log.fatal(error)
        }
    }

    async delete(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
            return response;
        } catch (error) {
            log.fatal(error)
        }
    }
}
