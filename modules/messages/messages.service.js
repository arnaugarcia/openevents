const GenericCrudService = require("../generic-crud.service");

class MessagesService extends GenericCrudService {
    constructor() {
        super("message")
    }

    async saveMessageForUser(userId, message) {
        message.timestamp = new Date();
        return this.save(message);
    }
}


module.exports = MessagesService;
