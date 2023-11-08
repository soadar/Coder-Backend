import { dirname } from 'path';
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

import { compareSync, genSaltSync, hashSync } from 'bcrypt';

/**
 * 
 * @param {*} password string to encrypt.
 * @returns 
 */
export const createHash = (password) => hashSync(password, genSaltSync(10));

export const isValidPassword = (password, user) => compareSync(password, user.password);


