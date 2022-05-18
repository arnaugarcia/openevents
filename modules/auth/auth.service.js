const UsersService = require("../users/users.service");

class AuthService extends UsersService {

    constructor() {
        super("users");
    }

    async authenticate(email, password) {
        const [results] = await global.connection.promise().query("SELECT * FROM users WHERE email = ? ", [email]);
    }

    async register(user) {

        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const myPlaintextPassword = user.password;

        const salt = bcrypt.genSaltSync(saltRounds);
        user.password = bcrypt.hashSync(myPlaintextPassword, salt);

        const result = await this.save(user);

        delete result.password;

        return result;

    }

}

module.exports = AuthService;
