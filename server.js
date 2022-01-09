import express from 'express';
import mongoose from 'mongoose';
import {DISH_ROUTER} from './router/dish.router.js';
import {ORDER_ROUTER} from './router/order.router.js';
import {REGISTER_ROUTER} from "./account/register.js";
import {LOGIN_ROUTER} from "./account/login.js";

//Startup
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb://127.0.0.1:27017")
    .then((response) => console.log("Connected to database"))
    .catch((error) => console.error("Connection failed"));

app.use(REGISTER_ROUTER);
app.use(LOGIN_ROUTER);
app.use(DISH_ROUTER);
app.use(ORDER_ROUTER);

app.listen(1324);
console.log("server started");