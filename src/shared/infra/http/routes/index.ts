import { Router } from 'express';
import ensureAutenticated from '@modules/users/infra/http/middlewares/ensureAutenticated';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionRouter from '@modules/users/infra/http/routes/session.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';


const routes = Router();

routes.use('/appointments', appointmentsRouter, ensureAutenticated);
routes.use('/users', usersRouter, ensureAutenticated);
routes.use('/session', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);


export default routes;
