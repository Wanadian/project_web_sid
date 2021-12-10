import express from "express";
import {User} from '../model.js';

const app = express();

app.post("/register", (req, res) => {
    const userToSave = new User(req.body);
    userToSave.save().then((user) => res.json(user));
});