import { Router } from 'express';
import UserController from './app/controllers/UserController';
import databaseConfig from './database/index'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'
import multer from 'multer';
import multerConfig from './config/multer'
import FileController from './app/controllers/FileController'
import CollaboratorController from './app/controllers/CollaboratorController'

const routes = new Router();
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

// rotas autenticadas

routes.use(authMiddleware)

routes.put('/update', UserController.update)

// Lista de colaborades
routes.get('/collaborator', CollaboratorController.index)


// upload
routes.post('/files',upload.single('file'), FileController.store)

export default routes;