import express from 'express';
import {checkTokenMiddleware} from '../requestFilter.js';
import {Dish} from '../model.js';

const router = express.Router();
const app = express();

router.post('/dish', (request, response) => {
//print all dishes
    app.get('/', checkTokenMiddleware, async (req, res) => {
        Dish.find()
            .then((dishes) => res.json(dishes))
            .catch(() => res.status(404).end());
    });

//print one dish by ID
    app.get('/:id', checkTokenMiddleware, async (req, res) => {
        Dish.findById(req.params.id)
            .then((dish) => res.json(dish))
            .catch(() => res.status(404).end());
    });
//delete one dish by ID in menu
    app.delete('/:id', checkTokenMiddleware, async (req, res) => {
        Dish.findByIdAndDelete(req.params.id)
            .then((dish) => res.json(dish))
            .catch(() => res.status(404).end());
    });
//add Dish in menu
    app.post('/', checkTokenMiddleware, (req, res) => {
        const dishToSave = new Dish(req.body);
        dishToSave.save()
            .then((dish) => res.json(dish));
    });
});

export {router as DISH_ROUTER}
