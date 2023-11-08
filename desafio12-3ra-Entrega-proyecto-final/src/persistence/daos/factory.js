/* ------------------------------------ - ----------------------------------- */
import ProductDaoFS from "./fileSystem/product.dao.js";
import UserDaoFS from "./fileSystem/user.dao.js";
/* ------------------------------------ - ----------------------------------- */
import { initMongoDB } from "./mongodb/connection.js";
import ProductDaoMongo from "./mongodb/product.dao.js";
import UserDaoMongo from "./mongodb/user.dao.js";
/* ------------------------------------ - ----------------------------------- */
import { initMySqlDB } from "./mysql/connection.js";
import ProductDaoMySql from "./mysql/product.dao.js";
import UserDaoMySql from "./mysql/user.dao.js";

let userDao;
let prodDao;
let persistence = process.argv[2];

console.log("persistence", persistence);

switch (persistence) {
    case "file":
        userDao = new UserDaoFS();
        prodDao = new ProductDaoFS();
        console.log(persistence);
        break;
    case "mongo":
        await initMongoDB();
        userDao = new UserDaoMongo();
        prodDao = new ProductDaoMongo();
        console.log(persistence);
        break;
    case "mysql":
        await initMySqlDB();
        userDao = new UserDaoMySql();
        prodDao = new ProductDaoMySql();
        console.log(persistence);
        break;
    default:
        await initMongoDB();
        userDao = new UserDaoMongo();
        prodDao = new ProductDaoMongo();
        console.log('mongo default');
        break;
}

export default { prodDao, userDao };
