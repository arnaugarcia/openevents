const GenericCrudService = require("../generic-crud.service");

class AssistanceService extends GenericCrudService {
    constructor() {
        super("assistance")
    }

    async saveAssistanceForUser(eventId, userId) {
        // check that assistance exists by id
        const assistance = await this.find(userId);
        if (assistance) {
            const [results] = await global.connection.promise().query("INSERT INTO assistance (event_id, user_id) VALUES (?, ?)", [eventId, userId]);
            return results[0];
        }
        return null;
    }

    async find(id) {
        const results = await global.connection.promise().query("SELECT * FROM assistance WHERE user_id = ?", id);
        return results[0][0];
    }

    async findAssistancesForEvent(id) {
        const results = await global.connection.promise().query("SELECT * FROM assistance WHERE event_id = ?", id);
        return results[0];
    }

    async findAssistancesForEventAndUser(eventId, userId) {
        const results = await global.connection.promise().query("SELECT * FROM assistance WHERE event_id = ? AND user_id = ?", [eventId, userId]);
        return results[0];
    }
}


module.exports = AssistanceService;
