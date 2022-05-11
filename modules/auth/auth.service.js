class AuthService {

    async authenticate(email, password) {
        const [results] = await global.connection.promise().query("SELECT * FROM users WHERE email = ? ", [email]);
    }

    async register(user) {

        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        const myPlaintextPassword = user.password;

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(myPlaintextPassword, salt);


    }

}
