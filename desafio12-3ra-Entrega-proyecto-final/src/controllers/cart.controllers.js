import { TicketModel } from "../persistence/daos/mongodb/models/ticket.model.js";
import * as service from "../services/cart.services.js";

export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        return res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prod = await service.getById(id);
        if (!prod) {
            return res.status(404).json({
                status: 'error',
                msg: 'El ID no fue encontrado.',
            });
        }
        return res.json(prod);
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await service.create();
        if (!newProd) {
            return res.status(404).json({
                status: 'error',
                msg: 'Ocurrio un error al crear.',
            });
        }
        return res.json(newProd);
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const response = await service.update(cid, pid)
        if (!response) {
            return res.status(404).json({
                status: 'error',
                msg: 'El ID no fue encontrado.',
            });
        }
        return res.json(response);
    } catch (error) {
        next(error.message);
    }
};

export const updateCant = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const response = await service.updateCant(cid, pid, quantity);
        if (!response) {
            return res.status(404).json({
                status: 'error',
                msg: 'El ID no fue encontrado.',
            });
        }
        return res.json(response);
    } catch (error) {
        next(error.message);
    }
};
export const delProdInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const response = await service.delProdInCart(cid, pid);
        if (!response) {
            return res.status(404).json({
                status: 'error',
                msg: 'El ID no fue encontrado.',
            });
        }
        return res.json(response);
    } catch (error) {
        next(error.message);
    }
};

export const delProdsInCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const response = await service.delProdsInCart(cid);
        if (!response) {
            return res.status(404).json({
                status: 'error',
                msg: 'El ID no fue encontrado.',
            });
        }
        return res.json(response);
    } catch (error) {
        next(error.message);
    }
};

export const purchase = async (req, res) => {
    try {
        const { cid } = req.params;

        const user = await service.getByCart(cid)

        if (user) {
            const total = await service.purchase(cid);

            if (!total) {
                return res.status(204).json({
                    status: 'error',
                    msg: 'El/los productos no tienen stock.',
                });
            }

            const response = await TicketModel.create({
                code: generarStringAleatorio(),
                amount: total,
                purchaser: user.email
            });
            return res.json(response);
        }
        return res.status(500).json({
            status: 'error',
            msg: 'No existe ningun usuario con ese carrito.',
        });

    } catch (error) {
        next(error.message);
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