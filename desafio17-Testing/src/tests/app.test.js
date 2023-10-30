//npm i jest supertest

import { faker } from '@faker-js/faker';
import request from 'supertest';
import "../../src/persistence/daos/factory.js";
import app from "../server.js";

describe('Tests integrales Api E-Commerce [Carts]', () => {

    test('[GET-ALL-Carts] /api/carts', async () => {
        const response = await request(app).get('/api/carts');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
    });

    test('[GET-Cart-by-Id] /api/carts/:cid', async () => {
        const cidFail = '6539de888ed021f6ed570539'
        const responseFail = await request(app).get(`/api/carts/${cidFail}`);
        expect(responseFail.status).toBe(404);
        expect(responseFail.body.message).toEqual('Not Found');

        const cid = '6539de888ed021f6ed570537'
        const response = await request(app).get(`/api/carts/${cid}`);
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('_id');
        expect(response.body.data.products).toBeInstanceOf(Array);
    });

    test('[DELETE-Empty-cart] /api/carts/:cid', async () => {
        const cid = '6539de888ed021f6ed570537'
        const response = await request(app).delete(`/api/carts/${cid}`);
        expect(response.status).toBe(200);
        expect(response.body.data.products).toHaveLength(0);
    });

    test('[POST-New-Product-in-Cart] /api/carts/:cid/products/:pid', async () => {
        const cid = '650919fc0aab52e0d0687df3'
        const pid = '64caea7554089ac708c36892'
        const response = await request(app).post(`/api/carts/${cid}/products/${pid}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data.products).toBeInstanceOf(Array);
        expect(response.body.data.products).toHaveLength(1);
    });

})


describe('Tests integrales Api E-Commerce [Sessions]', () => {

    test('[POST-Login] /api/sessions/login', async () => {
        const userTest = {
            email: '99@99',
            password: '99'
        }
        const response = await request(app).post(`/api/sessions/login`).send(userTest);;
        // expect(id).toBeDefined();
        // expect(response.status).toBe(200);
        // expect(response.body).toHaveProperty('data');
        // expect(response.body.data).toBeInstanceOf(Object);
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual('Login ok');
        // expect(id).toBe(response.body.data._id);
        // expect(response.body.data.role).toMatch(/^(premium|user)$/)
        const userFail = {
            email: '999@999',
            password: '999'
        }
        const responseF = await request(app).post(`/api/sessions/login`).send(userFail);;
        expect(responseF.status).toBe(401);
        expect(responseF.body.error).toEqual('Unauthorized');

    });

    test('[GET-Premium] /api/sessions/premium/:id', async () => {
        const id = '64ff7cfa218fb08b6787d31d'
        const response = await request(app).get(`/api/sessions/premium/${id}`);
        expect(id).toBeDefined();
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Object);
        expect(id).toBe(response.body.data._id);
        expect(response.body.data.role).toMatch(/^(premium|user)$/)
    });

})

describe('Tests integrales Api E-Commerce [Products]', () => {

    test('[POST-PROD] /api/products', async () => {
        const newProd = {
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: faker.string.uuid(),
            price: faker.commerce.price(),
            status: faker.datatype.boolean(),
            stock: faker.number.int(),
            category: faker.commerce.department(),
            thumbnails: faker.image.url()
        };
        const response = await request(app).post('/api/products').send(newProd);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Object);
        expect(newProd.title).toBe(response.body.data.title);
    });


    test('[PUT-PROD] /api/products/:pid', async () => {
        const pid = '64caea7554089ac708c3689a'
        const update = {
            stock: faker.number.int()
        };
        const response = await request(app).put(`/api/products/${pid}`).send(update);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Object);
        expect(update.stock).toBe(response.body.data.stock); // data[0] ??
    });

    test('[DELETE-PROD] /api/products/', async () => {
        const newProd = {
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            code: faker.string.uuid(),
            price: faker.commerce.price(),
            status: faker.datatype.boolean(),
            stock: faker.number.int(),
            category: faker.commerce.department(),
            thumbnails: faker.image.url()
        };
        let response = await request(app).post('/api/products').send(newProd);
        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('_id');

        const pid = response.body.data._id;
        response = await request(app).delete(`/api/products/${pid}`);
        expect(response.status).toBe(200);

        response = await request(app).delete(`/api/products/${pid}`);
        expect(response.status).toBe(404);
    });

})