import { Router } from 'express';
import AppointsController from '../controllers/appointmentesController';


const appointmentRouter = Router();
const appointerController = new AppointsController();


appointmentRouter.post('/', appointerController.create);

// appointmentRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

export default appointmentRouter;
