import multer from 'multer';
import { __dirname } from '../utils.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '/uploads/'
        switch (file.fieldname) {
            case 'profile':
                folder += 'profiles'
                break;
            case 'product':
                folder += 'products'
                break;
            case 'document':
            case 'address':
            case 'stateAccount':
                folder += 'documents'
                break;
        }
        cb(null, __dirname + folder)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}${Math.floor(Math.random() * 10)}.${file.originalname.slice(-3)}`)
    }
})

export const uploader = multer({ storage: storage })