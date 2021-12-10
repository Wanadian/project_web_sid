import express from 'express';
import {checkTokenMiddleware} from '../requestFilter.js';
import {Dish, Order} from '../model.js';
import {v4 as uuid} from 'uuid';

const router = express.Router();

//add order
router.post('/orders', checkTokenMiddleware, (request, response) => {
    Order.findOne({userId: request.auth.id, state: 'opened'})
        .then((order) => {
            if (order) {
                response.status(409).json({message: "Order already in progress"});
            }
            const orderToSave = new Order({id: uuid(), userId: request.auth.id, price: 0, dishes: [], state: 'opened'});
            return orderToSave.save();
        })
        .then((order) => {
            if (!order) {
                response.status(404).end();
            }
            return response.status(201).json(order);
        })
        .catch(() => response.status(500).end());
});

//get closed user's orders
router.get('/orders', checkTokenMiddleware, (request, response) => {
    Order.find({userId: request.auth.id, state: 'closed'})
        .then((orders) => {
            if (!orders) {
                response.status(404).end();
            }
            return response.status(200).json(orders);
        })
        .catch(() => response.status(500).end());
});

//get opened user's order
router.get('/orders/current', checkTokenMiddleware, (request, response) => {
    Order.findOne({userId: request.auth.id, state: 'opened'})
        .then((order) => {
            if (!order) {
                response.status(404).end();
            }
            return response.status(200).json(order);
        })
        .catch(() => response.status(500).end());
});

//get one order by id
router.get('/orders/:id', checkTokenMiddleware, (request, response) => {
    Order.findOne({id: request.params.id, userId: request.auth.id})
        .then((order) => {
            if (!order) {
                response.status(404).end();
            }
            return response.status(200).json(order);
        })
        .catch(() => response.status(500).end());
});

//delete one order by ID
router.delete('/orders/current', checkTokenMiddleware, (request, response) => {
    Order.findOneAndDelete({userId: request.auth.id, state: 'opened'})
        .then((result) => {
            if (!result) {
                response.status(404).end();
            }
            response.status(204).end();
        })
        .catch(() => response.status(500).end());
});

//add dish to order
router.patch('/orders/current/dishes', checkTokenMiddleware, (request, response) => {
    Order.findOne({userId: request.auth.id, state: 'opened'})
        .then((order) => {
            if (!order) {
                return response.status(404).json({message: 'ah'});
            }
            return Promise.all([order, Dish.findOne({name: request.body.dishName})])
        })
        .then(([order, dish]) => {
            if (!dish) {
                return response.status(404).json({message: 'ahhhhhhhhhhhhh'});
            }
            order.price += dish.price;
            order.dishes.push(request.body.dishName);
            order.save().then((order) => response.status(200).json(order));
        })
        .catch(() => response.status(500).end());
});

//remove dish from order
router.delete('/orders/current/dishes/:name', checkTokenMiddleware, (request, response) => {
    Order.findOne({userId: request.auth.id, state: 'opened'})
        .then((order) => {
            if (!order) {
                return response.status(404).json({message: 'ah'});
            }
            return Promise.all([order, Dish.findOne({name: request.params.name})])
        })
        .then(([order, dish]) => {
            if (!order) {
                return response.status(404).end();
            }
            const index = order.dishes.findIndex(name => name === request.params.name);
            order.price -= dish.price;
            order.dishes.splice(index, 1);
            order.save().then((order) => response.status(200).json(order));
        })
        .catch(() => response.status(500).end());
});

//validate the order
router.patch('/orders/current/validate', checkTokenMiddleware, (request, response) => {
    Order.findOne({userId: request.auth.id, state: 'opened'})
        .then((order) => {
            if (!order) {
                return response.status(404).end();
            }
            order.address = request.body.address;
            order.state = 'closed';
            order.save()
                .then((order) => response.status(200).json(order).end());
        })
        .catch(() => response.status(500).end());
});

export {router as ORDER_ROUTER};
