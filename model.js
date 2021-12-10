//JSONS Classes
import mongoose from "mongoose";

export const User = mongoose.model("User", {id: String, username: String, password: String});
export const Dish = mongoose.model("Dish", {name: String, price: Number, allergen: String, description: String});
export const Order = mongoose.model("Order", {id: String, userId: String, price: Number, dishes: Array, state: String});