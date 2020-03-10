import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);
// Routes for User
routes.post('/user/store', UserController.store);
routes.delete('/user/delete', UserController.delete);
routes.put('/user/update/', UserController.update);
routes.get('/user/index', UserController.index);
routes.get('/user/show/:id', UserController.show);
// Routes for Recipient
routes.post('/recipient/store', RecipientController.store);
routes.delete('/recipient/delete', RecipientController.delete);
routes.put('/recipient/update/:id', RecipientController.update);
routes.get('/recipient/index', RecipientController.index);
routes.get('/recipient/show/:id', RecipientController.show);

export default routes;
