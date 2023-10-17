import dictionaryError from "../utils/errors.dictionary.js";

import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

import ProductService from "../services/product.services.js";
const productService = new ProductService();

import Controllers from "./class.controller.js";

export default class productController extends Controllers {
    constructor() {
        super(productService);
    }

    getAll = async (req, res, next) => {
        const { page, limit, sort, query } = req.query;
        try {
            const response = await productService.getAll(page, limit, sort, query);
            if (!response) return http.NotFound(res, dictionaryError.NOT_FOUND);
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

    getByIdDTO = async (req, res, next) => {
        try {
            const { id } = req.user;
            const response = await productService.getByIdDTO(id);
            if (response) return http.Ok(res, response);
            return http.NotFound(res, dictionaryError.NOT_FOUND);
        } catch (error) {
            next(error);
        }
    }

    create = async (req, res, next) => {
        try {
            const response = await this.service.create(req.body);
            if (!response) return http.NotFound(res, dictionaryError.CREATE);
            if (req.user?.role === 'premium') {
                response.owner = req.user.email;
                response.save();
            }
            return http.Ok(res, response);
        } catch (error) {
            next(error);
        }
    }

    remove = async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await this.service.getById(id);
            if (!product) return http.NotFound(res, dictionaryError.NOT_FOUND);
            if (req.user?.role === 'premium' && req.user?.email !== product.owner) return http.Unauthorized(res, 'Unauthorized')
            const del = await this.service.remove(id);
            return http.Ok(res, del);

        } catch (error) {
            next(error);
        }
    };
}
