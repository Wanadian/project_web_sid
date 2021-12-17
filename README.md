# Web development project : ThamKitchen  
## *Routes possible*  
* POST /register  
* POST /login  
* POST /dishes  
* GET /dishes  
* GET /dishes/:name  
* DELETE dishes/:name  
* POST /orders  
* GET /orders  
* GET /orders/current  
* GET /orders/:id  
* DELETE /orders/current  
* PATCH /orders/current/dishes  
* DELETE /orders/current/dishes/:name  
* PATCH /orders/current/validate  

## *Connection*  
* Port of the project : 1324
* Database : you need to enter the URL of the database you want to use. By default it is mongodb://localhost:27017/ThamKitchen
* Chaque requête devra avoir un Bearer token prit lors de la connection au compte
* Lancer l'API avec la commande : npm start
