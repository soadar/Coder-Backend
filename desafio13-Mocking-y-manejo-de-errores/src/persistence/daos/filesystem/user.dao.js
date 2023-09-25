import fs from 'fs';
import { __dirname } from '../../../utils.js';
const pathFile = __dirname + "/db/users.json";

export default class UserDaoFS {
    constructor(path) {
        this.path = path;
    }

    async createUser(obj) {
        try {
            const user = {
                id: await this.#getMaxId() + 1,
                ...obj
            }
            const usersFile = await this.getUsers();
            usersFile.push(user);
            await fs.promises.writeFile(this.path, JSON.stringify(usersFile));
            return user;
        } catch (error) {
            next(error);
        }
    }

    async #getMaxId() {
        let maxId = 0;
        const users = await this.getUsers();
        users.map((user) => {
            if (user.id > maxId) maxId = user.id;
        });
        return maxId;
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const users = await fs.promises.readFile(this.path, 'utf-8');
                const usersJS = JSON.parse(users);
                return usersJS
            } else {
                return [];
            }
        } catch (error) {
            next(error);
        }
    }

    async getById(id) {
        try {
            const usersFile = await this.getUsers();
            const user = usersFile.find((u) => u.id === id);
            if (user) return user
            else return false;
            //    user ? user : false
        } catch (error) {
            next(error);
        }
    }

    async update(obj, id) {
        try {
            const usersFile = await this.getUsers();
            const index = usersFile.findIndex(user => user.id === id);
            if (index === -1) {
                throw new Error('id not found');
            } else {
                usersFile[index] = { ...obj, id }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(usersFile));
        } catch (error) {
            next(error);
        }
    }

    async delete(id) {
        try {
            const usersFile = await this.getUsers();
            if (usersFile.length > 0) {
                const newArray = usersFile.filter(user => user.id !== id);
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            } else {
                throw new Error('User not found');
            }
        } catch (error) {
            next(error);
        }
    }
}