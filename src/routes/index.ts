// import 'reflect-metadata';
import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import usersRouter from './users.routes';
import sessionRouter from './session.routes';
import ensureAutenticated from '../middlewares/ensureAutenticated';

const routes = Router();
routes.use(ensureAutenticated);

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/session', sessionRouter);

export default routes;
