const HttpStatus = require('http-status-codes');

function privateRoute(req, res, next) {

    function unAuthorized() {
        return res.status(HttpStatus.UNAUTHORIZED).json({error: "Unauthorized"});
    }

    if (!req.headers.authorization) return unAuthorized();

    const token = req.headers.authorization.split(" ")[1];

    // comprobamos que haya token
    if (!token) return unAuthorized();

    const jwt = require('jsonwebtoken');
    try {
        // verificamos el token y obtenemos el payload, en caso que no sea valido capturamos el error y lo propagamos al middleware de errores
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.USER_ID = decoded.id
        req.USER_EMAIL = decoded.email
        next()
    } catch (error) {
        return unAuthorized();
    }

}

module.exports = { privateRoute }
