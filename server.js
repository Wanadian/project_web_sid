import express from 'express';
import mongoose from 'mongoose';
import {DISH_ROUTER} from './router/dish.router.js';
import {ORDER_ROUTER} from './router/order.router.js';

//Startup
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://admin:admin@cluster0.uxksi.mongodb.net/ThamKitchen?retryWrites=true&w=majority")
    .then((response) => console.log("Connected to database"))
    .catch((error) => console.error("Connection failed"));

app.use(DISH_ROUTER);
app.use(ORDER_ROUTER);

app.listen(1324);
console.log("server started");