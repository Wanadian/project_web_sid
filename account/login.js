import jwt from 'jsonwebtoken';
import express from 'express';
import {User} from '../model.js';
const app = express();

app.post('/login', (req, res) => {
    // If no data in request
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Error. Please enter the correct username and password'});
    }
    // Checking
    const user = User.findOne({username: req.body.username, password: req.body.password});
    // If user doesn't exist
    if (!user) {
        return res.status(400).json({message: 'Error. Wrong login or password'});
    }
    // Create token
    const token = jwt.sign({id: user.id, username: user.username}, SECRET, {expiresIn: '3 hours'});
    return res.json({token: token});
})