import { Request, Response } from "express";
import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import {container} from 'tsyringe';

export default class ProvidersControlles{
  public async index(request: Request, response: Response): Promise<Response>{
    const user_id = request.user.id;
    const listProviders = container.resolve(ListProvidersService);
    const providers = await listProviders.execute( { user_id }  );

    return response.json(providers);
  }
}
