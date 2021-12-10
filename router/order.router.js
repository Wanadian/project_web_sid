import express from 'express';
import {checkTokenMiddleware} from '../requestFilter.js';
import {Order} from '../model.js';
import {Dish} from '../model.js';

const router = express.Router();
const app = express();

router.post('/order', (request, response) => {
//add order
    app.post('/', checkTokenMiddleware, (req, res) => {
        const orderToSave = new Order(req.id_client.dish);
        orderToSave.price = 0;
        orderToSave.dish.forEach(element => orderToSave.price = orderToSave.price = +orderToSave.dish.price);
        orderToSave.save()
            .then((order) => res.json(order));
    });
//print one order by ID
    app.get('/:id', checkTokenMiddleware, async (req, res) => {
        Order.findById(req.params.id)
            .then((order) => res.json(order))
            .catch(() => res.status(404).end());
    });
//print orders by id_client
    app.get('/:id', checkTokenMiddleware, async (req, res) => {
        Order.findById(req.params.id)
            .then((orders) => res.json(orders))
            .catch(() => res.status(404).end());
    });
//delete one order by ID
    app.delete('/:id', checkTokenMiddleware, async (req, res) => {
        Order.findByIdAndDelete(req.params.id)
            .then((order) => res.json(order))
            .catch(() => res.status(404).end());
    });
});

export {router as ORDER_ROUTER}
