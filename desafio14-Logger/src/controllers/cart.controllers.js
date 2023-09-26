import { TicketModel } from "../persistence/daos/mongodb/models/ticket.model.js";
import * as service from "../services/cart.services.js";

import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

import dictionaryError from "../utils/errors.dictionary.js";

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        return http.Ok(res, response);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await service.getById(id);
        if (cart) return http.Ok(res, cart);
        return http.NotFound(res, dictionaryError.CART_NOT_FOUND);
    } catch (error) {
        next(error);
    }
}

export const create = async (req, res, next) => {
    try {
        const newCart = await service.create();
        if (newCart) http.Ok(res, newCart);
        return http.NotFound(res, dictionaryError.CART_CREATE);
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const response = await service.update(cid, pid)
        if (response) return http.Ok(res, response);
        return http.NotFound(res, dictionaryError.CART_UPDATE);
    } catch (error) {
        next(error);
    }
};

export const updateCant = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const response = await service.updateCant(cid, pid, quantity);
        if (response) return http.Ok(res, response);
        return http.NotFound(res, dictionaryError.CART_UPDATE);
    } catch (error) {
        next(error);
    }
};

export const delProdInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const response = await service.delProdInCart(cid, pid);
        if (response) return http.Ok(res, response);
        return http.NotFound(res, dictionaryError.PROD_NOT_FOUND);
    } catch (error) {
        next(error);
    }
};

export const delProdsInCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const response = await service.delProdsInCart(cid);
        if (response) return http.Ok(res, response);
        return http.NotFound(res, dictionaryError.CART_NOT_FOUND);
    } catch (error) {
        next(error);
    }
};

export const purchase = async (req, res) => {
    try {
        const { cid } = req.params;

        const user = await service.getByCart(cid)
        if (!user) return http.NotFound(res, dictionaryError.CART_INTO_USER);

        const total = await service.purchase(cid);
        if (!total) return http.NotFound(res, dictionaryError.CART_STOCK);

        const response = await TicketModel.create({
            code: generarStringAleatorio(),
            amount: total,
            purchaser: user.email
        });
        return http.Ok(res, response);
    } catch (error) {
        next(error);
    }
};

function generarStringAleatorio() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let resultado = '';
    for (let i = 0; i < 10; i++) {
        const indiceAleatorio = Math.floor(Math.random() * letras.length);
        resultado += letras.charAt(indiceAleatorio);
    }
    return resultado;
}