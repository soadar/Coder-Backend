import MessageManager from "../persistence/daos/mongodb/message.dao.js";
const messageDao = new MessageManager();

import Services from "./class.services.js";

export default class MessageService extends Services {
    constructor() {
        super(messageDao);
    }
}