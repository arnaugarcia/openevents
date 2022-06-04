const GenericCrudService = require("../generic-crud.service");

class FriendsService extends GenericCrudService {
    constructor() {
        super("friends")
    }

    async findFriendsForUser(userId) {
        const [results] = await global.connection.promise().query("SELECT u.* FROM friends f inner join users u on f.user_id_friend = u.id where f.status = 1 and f.user_id = ?", userId);
        return results;
    }

    async findFriendRequestsForUser(userId) {
        const [results] = await global.connection.promise().query("SELECT u.* FROM friends f inner join users u on f.user_id_friend = u.id where f.status = 0 and f.user_id = ?", userId);
        return results;
    }
}


module.exports = FriendsService;
