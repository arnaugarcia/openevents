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

    async updateAsistanceForUser(eventId, userId, assistance) {
        const [results] = await global.connection.promise().query(
            "UPDATE assistance SET comentary = ?, puntuation = ? WHERE event_id = ? AND user_id = ?",
            [assistance.comentary, assistance.puntuation, eventId, userId]);
        return results[0];
    }

    async removeAssistanceForUserAndEvent(eventId, userId) {
        const [results] = await global.connection.promise().query("DELETE FROM assistance WHERE event_id = ? AND user_id = ?", [eventId, userId]);
        return results[0];
    }

    async saveAssistanceForUserAndEvent(userId, eventId, assistance) {
        assistance.user_id = userId;
        assistance.event_id = eventId;
        return this.save(assistance);
    }
}


module.exports = AssistanceService;
