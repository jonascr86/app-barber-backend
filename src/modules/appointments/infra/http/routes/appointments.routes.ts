import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAutenticated';
import { Router } from 'express';
import AppointsController from '../controllers/appointmentesController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';


const appointmentRouter = Router();
const appointerController = new AppointsController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', appointerController.create);
appointmentRouter.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);
appointmentRouter.get('/:provider_id/day-availability', providerDayAvailabilityController.index);

export default appointmentRouter;
