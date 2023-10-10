import { TicketModel } from "../persistence/daos/mongodb/models/ticket.model.js";

import { HttpResponse } from "../utils/http.response.js";
const http = new HttpResponse();

import CartService from "../services/cart.services.js";
const cartService = new CartService();

import dictionaryError from "../utils/errors.dictionary.js";
import log from "../utils/logger.js";
import Controllers from "./class.controller.js";

export default class CartController extends Controllers {
    constructor() {
        super(cartService);
    }

    create = async (req, res, next) => {
        try {
            const response = await cartService.create();
            if (response) http.Ok(res, response);
            return http.NotFound(res, dictionaryError.CREATE);
        } catch (error) {
            next(error)
        }
    };

    update = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const owner = req.user.email;
            const response = await cartService.update(cid, pid, owner)
            if (response === 2) return http.Unauthorized(res, 'Unauthorized');
            if (response) return http.Ok(res, response);
            return http.NotFound(res, dictionaryError.UPDATE);
        } catch (error) {
            next(error)
        }
    };

    updateCant = async (req, res, next) => {
        try {
            const { cid, pid } = req.params;
            const { quantity } = req.body;
            const response = await cartService.updateCant(cid, pid, quantity);
            if (response) return http.Ok(res, response);
            return http.NotFound(res, dictionaryError.UPDATE);
        } catch (error) {
            next(error)
        }
    };

    delProdInCart = async (req, res) => {
        try {
            const { cid, pid } = req.params;
            const response = await cartService.delProdInCart(cid, pid);
            if (response) return http.Ok(res, response);
            return http.NotFound(res, dictionaryError.NOT_FOUND);
        } catch (error) {
            log.fatal(error);
        }
    };

    delProdsInCart = async (req, res) => {
        try {
            const { cid } = req.params;
            const response = await cartService.delProdsInCart(cid);
            if (response) return http.Ok(res, response);
            return http.NotFound(res, dictionaryError.NOT_FOUND);
        } catch (error) {
            log.fatal(error);
        }
    };

    purchase = async (req, res) => {
        try {
            const { cid } = req.params;

            const user = await cartService.getByCart(cid)
            if (!user) return http.NotFound(res, dictionaryError.CART_INTO_USER);

            const total = await cartService.purchase(cid);
            if (!total) return http.NotFound(res, dictionaryError.STOCK);

            const response = await TicketModel.create({
                code: generarStringAleatorio(),
                amount: total,
                purchaser: user.email
            });
            return http.Ok(res, response);
        } catch (error) {
            log.fatal(error);
        }
    };
}

function generarStringAleatorio() {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let resultado = '';
    for (let i = 0; i < 10; i++) {
        const indiceAleatorio = Math.floor(Math.random() * letras.length);
        resultado += letras.charAt(indiceAleatorio);
    }
    return resultado;
}