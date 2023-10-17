import { TicketModel } from "./models/ticket.model.js";
import MongoDao from "./mongo.dao.js";

export default class UserDaoMongo extends MongoDao {
    constructor() {
        super(TicketModel);
    }
}