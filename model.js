//JSONS Classes
import mongoose from "mongoose";

export const User = mongoose.model("User", {username: String, password: String});
export const Dish = mongoose.model("Dish", {name: String, price: Number, allergene: String, description: String});
export const Order = mongoose.model("Order", {price: Number, dishes: Array});