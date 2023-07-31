import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {

    async getAll(page = 1, limit = 10, sort, query) {
        try {
            let options = { page, limit }
            options.sort = sort === 'asc' ? { stock: 1 } : sort === 'desc' ? { stock: -1 } : {};
            let filter = {};
            for (const key in query) {
                if (query[key]) {
                    filter[key] = query[key];
                }
            }
            const response = await ProductModel.paginate(filter, options);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            if (id.length != 24) {
                return false
            }
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async update(id, obj) {
        try {
            const response = await ProductModel.findByIdAndUpdate(id, obj, { new: true });
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id) {
        try {
            const response = await ProductModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

}