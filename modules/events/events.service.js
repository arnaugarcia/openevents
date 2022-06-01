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
}


module.exports = EventsService;
