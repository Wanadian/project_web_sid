import express from 'express';
import {checkTokenMiddleware} from '../requestFilter.js';
import {Dish} from '../model.js';

const router = express.Router();

//add dish
router.post('/dishes', checkTokenMiddleware, (request, response) => {
    const {name, price, allergen, description} = request.body;
    Dish.findOne({name: name})
        .then(dish => {
            if (dish) {
                return response.status(409).json({message: 'Dish already exists'});
            }
            const dishToSave = new Dish({name: name, price: price, allergen: allergen, description: description});
            dishToSave.save()
                .then((dish) => response.status(200).json(dish));
        })
        .catch(() => response.status(500).end());
});

//get all dishes
router.get('/dishes', checkTokenMiddleware, (request, response) => {
    Dish.find()
        .then((dishes) => {
            if (!dishes) {
                response.status(404).json({message: 'No dish found'});
            }
            return response.json(dishes);
        })
        .catch(() => response.status(500).end());
});

//get one dish by name
router.get('/dishes/:name', checkTokenMiddleware, (request, response) => {
    Dish.findOne({name: request.params.name})
        .then((dish) => {
            if (!dish) {
                response.status(404).json({message: 'Dish not found'});
            }
            return response.json(dish);
        })
        .catch(() => response.status(500).end());
});

//delete one dish by name
router.delete('/dishes/:name', checkTokenMiddleware, (request, response) => {
    Dish.findOneAndDelete({name: request.params.name})
        .then((result) => {
            if (!result) {
                response.status(404).json({message: 'Dish not found'});
            }
            response.status(204).json({message: 'Dish deleted'});
        })
        .catch(() => response.status(500).end());
});

export {router as DISH_ROUTER};
