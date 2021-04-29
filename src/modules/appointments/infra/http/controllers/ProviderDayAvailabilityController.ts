import { Request, Response } from "express";
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import {container} from 'tsyringe';

export default class ProviderMonthAvailabilityContoller{
  public async index(request: Request, response: Response): Promise<Response>{
    const {provider_id} = request.params;
    const {day, month, year} = request.body;
    const listProviderDayAvailability = container.resolve(ListProviderDayAvailabilityService);
    const availability = await listProviderDayAvailability.execute({provider_id, day, month, year});

    return response.json(availability);
  }
}
