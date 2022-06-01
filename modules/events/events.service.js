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
}


module.exports = EventsService;
