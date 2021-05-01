const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');


dotenv.config();

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'Sem token, permissão negada' });
    }
        try {
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(401).json({ msg: 'Token inválido' })
                } else {
                    req.user = decoded.user;
                    next();
                }
            })
        } catch(err) {
            console.log('Something went wrong with auth middleware')
           res.status(500).json({ msg: 'Server error' });
        }
}