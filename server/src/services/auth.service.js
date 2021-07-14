import jwt from 'jsonwebtoken'
import config from '../config/main'

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        console.log('Token Recieved: ' + token);
        const decoded = jwt.verify(token, config.auth.secretKey);
        req.userData = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            message: 'Authentication failed' 
        })
    }
};