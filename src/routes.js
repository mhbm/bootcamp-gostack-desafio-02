import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

routes.get('/', SessionController.store);

routes.post('/store', RecipientController.store);

export default routes;
