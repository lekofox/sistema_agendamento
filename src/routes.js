import { Router } from 'express';
import UserController from './app/controllers/UserController';
import databaseConfig from './database/index'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'

const routes = new Router();

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

// rotas autenticadas

routes.use(authMiddleware)

routes.put('/update', UserController.update)
 
export default routes;