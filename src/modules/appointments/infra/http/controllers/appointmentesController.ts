import { Request, Response } from "express";
import { parseISO } from 'date-fns';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import {container} from 'tsyringe';

export default class AppointsController{
  public async create(request: Request, response: Response): Promise<Response>{
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);
    const createAppointment = container.resolve(CreateAppointmentService);
    const appoitment = await createAppointment.execute({ provider_id, date: parsedDate });

    return response.json(appoitment);
  }
}
