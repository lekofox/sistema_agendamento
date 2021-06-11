import { Router } from 'express';
import UserController from './app/controllers/UserController';
import databaseConfig from './database/index'
import SessionController from './app/controllers/SessionController'
import authMiddleware from './app/middlewares/auth'
import multer from 'multer';
import multerConfig from './config/multer'
import FileController from './app/controllers/FileController'
import CollaboratorController from './app/controllers/CollaboratorController'
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationsController from './app/controllers/NotificationsController';

const routes = new Router();
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

// rotas autenticadas

routes.use(authMiddleware)

// Rota de agendamento
routes.post('/appointments', AppointmentController.store)
routes.get('/appointments', AppointmentController.index)

// rota de update
routes.put('/update', UserController.update)

// Lista de colaboradores
routes.get('/collaborator', CollaboratorController.index)

// Listagem de agendamentos por prestador de serviços
routes.get('/schedule', ScheduleController.index)

// Listagem de notificações
routes.get('/notifications', NotificationsController.index)
// marcar como lida
routes.put('/notifications/:id', NotificationsController.update)
// upload
routes.post('/files',upload.single('file'), FileController.store)

export default routes;