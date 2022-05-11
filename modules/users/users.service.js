const GenericCrudService = require("../generic-crud.service");

class UsersService extends GenericCrudService {
    constructor() {
        super("users")
    }
}

module.exports = UsersService;
