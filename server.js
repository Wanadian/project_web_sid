const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")

app.use(express.json())
mongoose.connect("mongodb://localhost:27017/thamkitchen")

//create json
const Dish = mongoose.model("Dish", {name : String , price : Number , allergene : String , description : String})
const Order = mongoose.model("Order", {id_client : Number , price : Number , dish : Array})

//DISH

//read all dishes
app.get("/dish", async(req,res) => {
    Dish.find()
        .then((dishes)=>res.json(dishes))
        .catch(()=>res.status(404).end())
})

//read one by ID
app.get("/dish/:id",async (req,res)=>{
    Dish.findById(req.params.id)
        .then((dish)=>res.json(dish))
        .catch(()=>res.status(404).end())
})

//delete one dish by ID in menu
app.delete("/dish/:id",async (req,res)=>{
    Dish.findByIdAndDelete(req.params.id)
        .then((dish)=>res.json(dish))
        .catch(()=>res.status(404).end())
})

//add Dish in menu
app.post("/dish", (req,res)=> {
    const dishToSave = new Dish(req.body)
    dishToSave.save().then((dish)=>res.json(dish))
})

//ORDER

//add order
app.post("/oder", (req,res)=> {
    const orderToSave = new Order(req.id_client.dish)
    orderToSave.price=0
    orderToSave.dish.forEach(element=>orderToSave.price=orderToSave.price=+orderToSave.dish.price)
    orderToSave.save().then((order)=>res.json(order))
})

//read one order by ID
app.get("/order/:id",async (req,res)=>{
    Order.findById(req.params.id)
        .then((order)=>res.json(order))
        .catch(()=>res.status(404).end())
})

//read orders by id_client
app.get("/order/:id",async (req,res)=>{
    Order.findById(req.params.id)
        .then((orders)=>res.json(orders))
        .catch(()=>res.status(404).end())
})

//delete one order by ID
app.delete("/order/:id",async (req,res)=>{
    Order.findByIdAndDelete(req.params.id)
        .then((order)=>res.json(order))
        .catch(()=>res.status(404).end())
})

app.listen(1234)