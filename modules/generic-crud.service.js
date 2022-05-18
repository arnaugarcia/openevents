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

    async save(object) {
        const fields = Object.keys(object);
        const values = Object.values(object);
        return  await global.connection.promise().query("INSERT INTO ?? (??) VALUES (?);", [this.entity, fields, values]);
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
