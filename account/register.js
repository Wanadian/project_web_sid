import express from "express";
import {User} from '../model.js';
import {v4 as uuid} from 'uuid';

const router = express.Router();

router.post("/register", (request, response) => {
    const {username, password} = request.body;
    User.findOne({username: username})
        .then(user => {
            if (user) {
                return response.status(409).json({message: 'User already exists'});
            }
            const userToSave = new User({id: uuid(), username, password});
            userToSave.save().then((user) => response.json(user));
        });
});

export {router as REGISTER_ROUTER};