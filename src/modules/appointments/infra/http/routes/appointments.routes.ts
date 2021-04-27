import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAutenticated';
import { Router } from 'express';
import AppointsController from '../controllers/appointmentesController';


const appointmentRouter = Router();
const appointerController = new AppointsController();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', appointerController.create);

export default appointmentRouter;
