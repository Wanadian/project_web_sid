//Get bearer from header
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'syughrvqs548641320UYGQXDDIUQOIZD422uhnqhzciuduiqzqc4dq2f1s0f2s4q4fq56102zf1qs4fe12s3f4q51d0zq2f1q51f4rg4512qs1q54q51q534zdq4z15d1q54zdq651251q5654D5Q15154sf51s3q16f4q1531fq4fe4qe153135'

const extractBearerToken = (request, response) => {
    const authHeader = request.get('Authorization');
    // Check if exists
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return response.sendStatus(401);
    }
    return authHeader.replace('Bearer ', '');
}

// Check token validity
const verifyToken = token => jwt.verify(token, JWT_SECRET,{});

// Check token
export const checkTokenMiddleware = (request, response, next) => {
    // Get token
    const token = extractBearerToken(request, response);
    // Check token validity
    try {
        verifyToken(token);
        //Get token's data
        request.auth = jwt.decode(token);
        next();
    } catch (error) {
        console.log(error);
        response.status(401).json({message: error.message});
    }
}

