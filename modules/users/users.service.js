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
        const results = await global.connection.promise().query(`UPDATE users t SET t.name = '${data.name}', t.last_name = '${data.last_name}', t.email = '${data.email}', t.image = '${data.image}' WHERE t.id = ${id}`, [data]);
        return results[0][0];
    }

    async findByKeyword(keyword) {
        const results = await global.connection.promise().query("SELECT * FROM users WHERE name LIKE '%" + keyword + "%' OR last_name LIKE '%" + keyword + "%' OR email LIKE '%" + keyword + "%'");
        return results[0][0];
    }

    async findStatistics(userId) {
        const [results] = await global.connection.promise().query("SELECT AVG(puntuation) AS average_score, COUNT(comentary) AS number_of_comments, (SELECT COUNT(*) FROM assistance WHERE puntuation < (SELECT AVG(puntuation) FROM assistance WHERE user_id = ?)) AS percentage_commenters_below FROM assistance WHERE user_id = ?", [userId, userId]);
        return results[0];
    }
}

module.exports = UsersService;
