const GenericCrudService = require("../generic-crud.service");

class UsersService extends GenericCrudService {
    constructor() {
        super("users")
    }

    async findByEmail(email) {
        const results = await global.connection.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        return results[0][0];
    }
}

module.exports = UsersService;
