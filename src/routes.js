import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.get('/', SessionController.store);

routes.post('/recipient/store', RecipientController.store);
routes.delete('/recipient/delete', RecipientController.delete);
routes.put('/recipient/update/:id', RecipientController.update);
routes.get('/recipient/index', RecipientController.index);
routes.get('/recipient/show/:id', RecipientController.show);

export default routes;
