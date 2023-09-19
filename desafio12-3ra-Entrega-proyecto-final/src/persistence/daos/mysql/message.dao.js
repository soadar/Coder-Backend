import { MessageModel } from "./models/message.model.js";
import MySQLDao from "./mysql.dao.js";

export default class MessageDaoMongo extends MySQLDao {
    constructor() {
        super(MessageModel);
    }

}