//All const
import express from 'express';
//const express = require("express")
const app = express()
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import {checkTokenMiddleware} from './RequestFilter.js'
import {DISH_ROUTER} from "./dish.router.js";

//Startup
app.use(express.json())
app.use(express.urlencoded({extended: true}))
mongoose.connect("mongodb+srv://admin:admin@cluster0.uxksi.mongodb.net/ThamKitchen?retryWrites=true&w=majority")
    .then((response) => console.log("Connected to database"))
    .catch((error) => console.error("Connection failed"))

app.use(DISH_ROUTER)
//login
app.post('/login', (req, res) => {
    // If no data in request
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({message: 'Error. Please enter the correct username and password'})
    }
    // Checking
    const user = User.findOne({username: req.body.username, password: req.body.password})
    // If user doesn't exist
    if (!user) {
        return res.status(400).json({message: 'Error. Wrong login or password'})
    }
    // Create token
    const token = jwt.sign({
        id: user.id,
        username: user.username
    }, SECRET, {expiresIn: '3 hours'})

    return res.json({token: token})
})

//Register

app.post("/register", (req, res) => {
    const userToSave = new User(req.body)
    userToSave.save().then((user) => res.json(user))
})
//JSONS Classes
const User = mongoose.model("User", {username: String, password: String})
const Dish = mongoose.model("Dish", {name: String, price: Number, allergene: String, description: String})
const Order = mongoose.model("Order", {price: Number, dishes: Array})


//DISH
//read all dishes
app.get("/dish", checkTokenMiddleware, async (req, res) => {
    Dish.find()
        .then((dishes) => res.json(dishes))
        .catch(() => res.status(404).end())
})

//read one by ID
app.get("/dish/:id", checkTokenMiddleware, async (req, res) => {
    Dish.findById(req.params.id)
        .then((dish) => res.json(dish))
        .catch(() => res.status(404).end())
})
//delete one dish by ID in menu
app.delete("/dish/:id", checkTokenMiddleware, async (req, res) => {
    Dish.findByIdAndDelete(req.params.id)
        .then((dish) => res.json(dish))
        .catch(() => res.status(404).end())
})
//add Dish in menu
app.post("/dish", checkTokenMiddleware, (req, res) => {
    const dishToSave = new Dish(req.body)
    dishToSave.save().then((dish) => res.json(dish))
})

//ORDER
//add order
app.post("/oder", checkTokenMiddleware, (req, res) => {
    const orderToSave = new Order(req.id_client.dish)
    orderToSave.price = 0
    orderToSave.dish.forEach(element => orderToSave.price = orderToSave.price = +orderToSave.dish.price)
    orderToSave.save().then((order) => res.json(order))
})
//read one order by ID
app.get("/order/:id", checkTokenMiddleware, async (req, res) => {
    Order.findById(req.params.id)
        .then((order) => res.json(order))
        .catch(() => res.status(404).end())
})
//read orders by id_client
app.get("/order/:id", checkTokenMiddleware, async (req, res) => {
    Order.findById(req.params.id)
        .then((orders) => res.json(orders))
        .catch(() => res.status(404).end())
})
//delete one order by ID
app.delete("/order/:id", checkTokenMiddleware, async (req, res) => {
    Order.findByIdAndDelete(req.params.id)
        .then((order) => res.json(order))
        .catch(() => res.status(404).end())
})

app.listen(1324)
console.log("server started")