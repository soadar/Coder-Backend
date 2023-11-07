import multer from 'multer';
import { __dirname } from '../utils.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        //console.log(file.fieldname);
        let folder = '/uploads/'
        switch (file.fieldname) {
            case 'profile':
                folder += 'profiles'
                break;
            case 'product':
                folder += 'products'
                break;
            case 'document':
                folder += 'documents'
                break;
        }
        //if (document.fieldname === 'document')
        cb(null, __dirname + folder)
    },
    filename: function (req, file, cb) {
        //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        //   cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, `doc_${Date.now()}_` + file.originalname)
    }
})

export const uploader = multer({ storage: storage })