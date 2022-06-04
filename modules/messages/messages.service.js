const GenericCrudService = require("../generic-crud.service");

class MessagesService extends GenericCrudService {
    constructor() {
        super("message")
    }

    async saveMessageForUser(message) {
        message.timestamp = new Date();
        return this.save(message);
    }
}


module.exports = MessagesService;
