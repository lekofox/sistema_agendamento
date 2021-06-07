import { Router } from 'express';
import UserController from './app/controllers/UserController';
import databaseConfig from './database/index'

const routes = new Router();

routes.post('/users', UserController.store)
 
export default routes;