import { MessageModel } from "./models/message.model.js";
import MongoDao from "./mongo.dao.js";

export default class MessageDaoMongo extends MongoDao {
    constructor() {
        super(MessageModel);
    }
}