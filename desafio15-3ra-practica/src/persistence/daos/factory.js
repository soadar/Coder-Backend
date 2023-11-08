/* ------------------------------------ - ----------------------------------- */
import log from "../../utils/logger.js";
import ProductDaoFS from "./filesystem/product.dao.js";
import UserDaoFS from "./filesystem/user.dao.js";
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

log.debug("persistence", persistence);

switch (persistence) {
    case "file":
        userDao = new UserDaoFS();
        prodDao = new ProductDaoFS();
        log.debug(persistence);
        break;
    case "mongo":
        await initMongoDB();
        userDao = new UserDaoMongo();
        prodDao = new ProductDaoMongo();
        log.debug(persistence);
        break;
    case "mysql":
        await initMySqlDB();
        userDao = new UserDaoMySql();
        prodDao = new ProductDaoMySql();
        log.debug(persistence);
        break;
    default:
        await initMongoDB();
        userDao = new UserDaoMongo();
        prodDao = new ProductDaoMongo();
        log.debug('mongo default');
        break;
}

export default { prodDao, userDao };
