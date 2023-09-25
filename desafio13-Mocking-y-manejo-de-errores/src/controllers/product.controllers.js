import * as service from "../services/product.services.js";
import dictionaryError from "../utils/errors.dictionary.js";
import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

export const getAll = async (req, res, next) => {

    const { page, limit, sort, query } = req.query;

    try {
        const response = await service.getAll(page, limit, sort, query);
        if (!response) return http.NotFound(res, dictionaryError.PROD_NOT_FOUND);
        const next = response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null;
        const prev = response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null;
        res.status(200).json({
            status: "success",
            payload: response.docs,
            count: response.totalDocs,
            pages: response.totalPages,
            totalPages: response.totalPages,
            prevPage: response.prevPage,
            nextPage: response.nextPage,
            page: Number(response.page),
            hasNextPage: response.hasNextPage,
            hasPrevPage: response.hasPrevPage,
            next,
            prev,
        });

    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prod = await service.getById(id);
        if (prod) return http.Ok(res, prod);
        return http.NotFound(res, dictionaryError.PROD_NOT_FOUND);
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.create(req.body);
        if (newProd) http.Ok(res, newProd);
        return http.NotFound(res, dictionaryError.PROD_CREATE);
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.update(id, req.body);
        if (response) return http.Ok(res, response);
        return http.NotFound(res, dictionaryError.PROD_UPDATE);
    } catch (error) {
        next(error.message);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.remove(id);
        if (response) return http.Ok(res, response);
        return http.NotFound(res, dictionaryError.PROD_DEL);
    } catch (error) {
        next(error);
    }
};

export const getByIdDTO = async (req, res, next) => {
    try {
        const { id } = req.user;
        const response = await service.getByIdDTO(id);
        if (response) return http.Ok(res, response);
        return http.NotFound(res, dictionaryError.PROD_NOT_FOUND);
    } catch (error) {
        next(error);
    }
}
