import * as service from "../services/cart.services.js";

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prod = await service.getById(id);
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
        const { cid, pid } = req.params;
        res.json(await service.update(cid, pid));
    } catch (error) {
        next(error.message);
    }
};

export const updateCant = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        res.json(await service.updateCant(cid, pid, quantity));
    } catch (error) {
        next(error.message);
    }
};
export const delProdInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        res.json(await service.delProdInCart(cid, pid));
    } catch (error) {
        next(error.message);
    }
};

export const delProdsInCart = async (req, res) => {
    try {
        const { cid } = req.params;
        res.json(await service.delProdsInCart(cid));
    } catch (error) {
        next(error.message);
    }
};
