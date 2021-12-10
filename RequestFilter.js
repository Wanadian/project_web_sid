//Get bearer from header
<<<<<<< HEAD
import jwt from "jsonwebtoken";

//Practical
const SECRET = "toto"
=======
import jwt from 'jsonwebtoken';

//Practical
const SECRET = 'toto'
>>>>>>> master

const extractBearerToken = headerValue => {
    if (typeof headerValue !== 'string') {
        return false
    }
    const matches = headerValue.match(/(bearer)\s+(\S+)/i)
    return matches && matches[2]
}
// Check token
export const checkTokenMiddleware = (req, res, next) => {
    // Get token
    const token = req.headers.authorization && extractBearerToken(req.headers.authorization)
    // Check if exist
    if (!token) {
        return res.status(401).json({message: 'Error. Need a token'})
    }
    // Check token validity
    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err) {
            res.status(401).json({message: 'Error. Bad token'})
        } else {
            return next()
        }
    })
}

