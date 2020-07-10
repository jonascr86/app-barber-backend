import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointimentService';
import {container} from 'tsyringe';

const appointmentRouter = Router();


appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = container.resolve(CreateAppointmentService);
  const appoitment = await createAppointment.execute({ provider_id, date: parsedDate });

  return response.json(appoitment);
});

// appointmentRouter.get('/', async (request, response) => {
//   const appointmentsRepository = getCustomRepository(AppointmentsRepository);
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

export default appointmentRouter;
