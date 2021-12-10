import jwt from 'jsonwebtoken';
import express from 'express';
import {User} from '../model.js';

const JWT_SECRET = 'syughrvqs548641320UYGQXDDIUQOIZD422uhnqhzciuduiqzqc4dq2f1s0f2s4q4fq56102zf1qs4fe12s3f4q51d0zq2f1q51f4rg4512qs1q54q51q534zdq4z15d1q54zdq651251q5654D5Q15154sf51s3q16f4q1531fq4fe4qe153135'
const router = express.Router();

function createJWT(userId) {
    return jwt.sign({id: userId}, JWT_SECRET, {algorithm: 'HS512', expiresIn: '5h', subject: 'account'});
}

router.post('/login', (request, response) => {
    // If no data in request
    if (!request.body.username || !request.body.password) {
        return response.status(418).json({message: 'Error. Please enter a correct username and password'});
    }
    // Checking
    User.findOne({username: request.body.username, password: request.body.password})
        .then(user => {
            // If user doesn't exist
            if (!user) {
                return response.status(400).json({message: 'Error. Wrong login or password'});
            }
            //If user exists
            // Create token
            const token = createJWT(user.id);
            return response.json({token: token});
        });
});

export {router as LOGIN_ROUTER};