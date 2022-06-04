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

    async saveFriendRequestForUserAndFriend(userId, friendId) {
        const [results] = await global.connection.promise().query("INSERT INTO friends (user_id, user_id_friend, status) VALUES (?, ?, 0)", [userId, friendId]);
        return results;
    }

    async acceptFriendRequestForUserAndFriend(userId, friendId) {
        const [results] = await global.connection.promise().query("UPDATE friends SET status = 1 WHERE user_id = ? AND user_id_friend = ?", [userId, friendId]);
        return results;
    }

    async rejectFriendRequestForUserAndFriend(userId, friendId) {
        const [results] = await global.connection.promise().query("DELETE FROM friends WHERE user_id = ? AND user_id_friend = ?", [userId, friendId]);
        return results;
    }
}


module.exports = FriendsService;
