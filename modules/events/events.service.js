const GenericCrudService = require("../generic-crud.service");

class EventsService extends GenericCrudService {
    constructor() {
        super("events")
    }

    async saveForUser(userId, event) {
        event.owner_id = userId;
        event.date = new Date();
        return this.save(event);
    }

    async update(eventId, event) {
        await global.connection.promise().query(`UPDATE events t SET t.name = '${event.name}', t.date = '${event.date}', t.image = '${event.image}', t.location = '${event.location}', t.description = '${event.description}', t.eventStart_date = '${event.eventStart_date}', t.eventEnd_date = '${event.eventEnd_date}', t.n_participators = ${event.n_participators}, t.type = '${event.type}' WHERE t.id = ${eventId}`);
        return this.find(eventId);
    }

    async search(criteria) {
        let query = "SELECT * FROM events WHERE ";
        if (criteria.location)
            query += `location LIKE '%${criteria.location}%'`;
        if (criteria.date) {
            if (criteria.location) query += " AND ";
            query += `date = '${criteria.date}'`;
        }
        if (criteria.keyword) {
            if (criteria.location || criteria.date) query += " AND ";
            query += `name LIKE '%${criteria.keyword}%' `;
        }
        if (!criteria.location && !criteria.date && !criteria.keyword) {
            query = "SELECT * FROM events";
        }
        const [results] = await global.connection.promise().query(query);
        return results;
    }

    async findForUser(id) {
        const results = await global.connection.promise().query("SELECT * FROM events WHERE owner_id = ?", [id]);
        return results[0];
    }

    async findFutureEventsForUser(id) {
        const results = await global.connection.promise().query("SELECT * FROM events WHERE owner_id = ? AND date > NOW()", [id]);
        return results[0];
    }

    async findFinishedEventsForUser(id) {
        const results = await global.connection.promise().query("SELECT * FROM events WHERE owner_id = ? AND date < NOW()", [id]);
        return results[0];
    }

    async findCurrentEventsForUser(id) {
        const results = await global.connection.promise().query("SELECT * FROM events WHERE owner_id = ? AND date BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 MONTH)", [id]);
        return results[0];
    }

    async findEventsWithAssistanceOfUser(userId) {
        const [results] = await global.connection.promise().query("SELECT e.*, a.puntuation, a.comentary FROM events e inner join assistance a on e.id = a.event_id WHERE a.user_id = ?", [userId]);
        return results;
    }

    async findFutureEventsWithAssistanceOfUser(userId) {
        const [results] = await global.connection.promise().query("SELECT e.*, a.puntuation, a.comentary FROM events e inner join assistance a on e.id = a.event_id WHERE a.user_id = ? AND e.date > NOW()", [userId]);
        return results;
    }

    async findFinishedEventsWithAssistanceOfUser(userId) {
        const [results] = await global.connection.promise().query("SELECT e.*, a.puntuation, a.comentary FROM events e inner join assistance a on e.id = a.event_id WHERE a.user_id = ? AND e.date < NOW()", [userId]);
        return results;
    }
}


module.exports = EventsService;
