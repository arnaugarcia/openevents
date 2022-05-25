const GenericCrudService = require("../generic-crud.service");

class UsersService extends GenericCrudService {
    constructor() {
        super("users")
    }

    async findByEmail(email) {
        const results = await global.connection.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        return results[0][0];
    }

    async update(id, data) {
        console.log(data);
        const results = await global.connection.promise().query(`UPDATE users t SET t.name = '${data.name}', t.last_name = '${data.last_name}', t.email = '${data.email}', t.image = '${data.image}' WHERE t.id = ${id}`, [data]);
        return results[0][0];
    }
}

module.exports = UsersService;
