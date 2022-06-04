const GenericCrudService = require("../generic-crud.service");

class MessagesService extends GenericCrudService {
    constructor() {
        super("message")
    }
}


module.exports = MessagesService;
