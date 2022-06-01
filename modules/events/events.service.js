const GenericCrudService = require("../generic-crud.service");

class AssistanceService extends GenericCrudService {
    constructor() {
        super("assistance")
    }
}


module.exports = AssistanceService;
