import { assert, expect } from 'chai';
import "../../src/persistence/daos/factory.js";
import CartService from "../services/cart.services.js";
const cartService = new CartService();

describe('Tests unitarios Api Carts', () => {

    it('Debería traer todos los changos', async () => {
        const response = await cartService.getAll();
        assert.typeOf(response, 'array');
    });

    it('Debería crear un chango vacio', async () => {
        const response = await cartService.create();
        expect(response).to.have.property('_id');
        assert.typeOf(response, 'object');
        assert.lengthOf(response.products, 0);
    });
})
