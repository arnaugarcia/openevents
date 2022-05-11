const GenericCrudService = require("../generic-crud.service");

class UserService extends GenericCrudService {
    constructor() {
        super("users")
    }
}

module.exports = UserService;
