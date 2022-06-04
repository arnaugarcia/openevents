const GenericCrudService = require("../generic-crud.service");

class MessagesService extends GenericCrudService {
    constructor() {
        super("message")
    }

    async saveMessageForUser(message) {
        message.timestamp = new Date();
        return this.save(message);
    }

    async findMessagesForUser(userId) {
        const results = await global.connection.promise().query("SELECT * FROM message WHERE user_id_recived = ?", userId);
        return results[0];
    }
}


module.exports = MessagesService;
