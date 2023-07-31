import * as service from "../services/product.services.js";

export const getAll = async (req, res, next) => {

    const { page, limit, sort, query } = req.query;

    try {
        const response = await service.getAll(page, limit, sort, query);
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
        res.status(500).json({
            status: 'error',
            msg: 'Ocurrio un error.',
            error: error.message
        });
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prod = await service.getById(Number(id));
        if (!prod) res.status(404).json({ msg: "Product not found!" });
        else res.json(prod);
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.create(req.body);
        if (!newProd) res.status(404).json({ msg: "Validation Error!" });
        else res.json(newProd);
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpd = await service.update(Number(id), req.body);
        res.json(prodUpd);
    } catch (error) {
        next(error.message);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await service.remove(id);
        res.json(prodDel);
    } catch (error) {
        next(error.message);
    }
};
