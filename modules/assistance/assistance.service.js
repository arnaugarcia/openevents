const GenericCrudService = require("../generic-crud.service");

class AssistanceService extends GenericCrudService {
    constructor() {
        super("assistance")
    }

    async saveAssistanceForUser(eventId, userId) {
        const [results] = await global.connection.promise().query("INSERT INTO assistance (event_id, user_id) VALUES (?, ?)", [eventId, userId]);
        return results[0];
    }

    async find(id) {
        const results = await global.connection.promise().query("SELECT * FROM assistance WHERE user_id = ?", id);
        return results[0][0];
    }

    async findAssistancesForEvent(id) {
        const results = await global.connection.promise().query("SELECT * FROM assistance WHERE event_id = ?", id);
        return results[0];
    }
}


module.exports = AssistanceService;
