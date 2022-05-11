class GenericCrudService {

    constructor(entity) {
        this.entity = entity;
    }

    async findAll() {
        const [results] = await global.connection.promise().query("SELECT * FROM ??", [this.entity])
        return results;
    }

    find(id) {
        // SELECT * FROM ?? WHERE id = 'params.id'
        return {};
    }

    save(user) {
        // INSERT INTO ?? (??) values (??)
        return {}
    }

    update(id, data) {
        // UPDATE ?? SET ?? = ? WHERE id = ?
        return {}
    }

    remove(id) {
        // DELETE FROM ?? WHERE id = ?
        return {}
    }

}

module.exports = GenericCrudService;
