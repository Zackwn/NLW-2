import { Router } from 'express'

/* Controllers */
import ClassesController from './controllers/ClassesController'
import ConnectionsController from './controllers/ConnectionsController'


const routes = Router()

/* Classes routes */
routes.post('/classes', ClassesController.create)
routes.get('/classes', ClassesController.index)

/* Connections routes */
routes.post('/connections', ConnectionsController.create)
routes.get('/total-connections', ConnectionsController.index)

export default routes