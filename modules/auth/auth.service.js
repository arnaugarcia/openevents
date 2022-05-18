const UsersService = require("../users/users.service");

class AuthService extends UsersService {

    constructor() {
        super("users");
    }

    async authenticate(email, password) {
        const encryptedPassword = this.encryptPassword(password);
        const user = await this.findByEmail(email);
        if (user && user.password === encryptedPassword) {
            const jwt = require('jsonwebtoken');

            return jwt.sign({id: user.id, email: user.email}, process.env.JWT_KEY);
        } else {
            return null;
        }
    }

    async register(user) {
        user.password = this.encryptPassword(user.password);
        const result = await this.save(user);

        delete result.password;

        return result;

    }

    encryptPassword(password) {
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const myPlaintextPassword = password;

        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(myPlaintextPassword, salt);
    }
}

module.exports = AuthService;
