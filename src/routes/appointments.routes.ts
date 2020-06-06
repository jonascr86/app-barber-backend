import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointimentService';

const appointmentRouter = Router();


appointmentRouter.post('/', async (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointmentService();
  const appoitment = await createAppointment.execute({ provider, date: parsedDate });

  return response.json(appoitment);
});

appointmentRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});

export default appointmentRouter;
