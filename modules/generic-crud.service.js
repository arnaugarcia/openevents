class GenericCrudService {

    constructor(entity) {
        this.entity = entity;
    }

    async findAll() {
        const [results] = await global.connection.promise().query("SELECT * FROM ??", [this.entity])
        return results;
    }

    async find(id) {
        const results = await global.connection.promise().query("SELECT * FROM ?? WHERE id = ?", [this.entity, id]);
        return results[0][0];
    }

    async save(object) {
        const fields = Object.keys(object);
        const values = Object.values(object);
        const [results] = await global.connection.promise().query("INSERT INTO ?? (??) VALUES (?);", [this.entity, fields, values]);
        return this.find(results.insertId);
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
