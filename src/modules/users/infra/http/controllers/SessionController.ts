import { Request, Response } from "express";
import {container} from 'tsyringe';
import SessionServices from '@modules/users/services/SessionServices';

export default class SessionController{
  public async createSession(request: Request, response: Response): Promise<Response>{
    const { email, password } = request.body;

    const sessionServices = container.resolve(SessionServices);

    const { user, token } = await sessionServices.execute({
      email,
      password,
    });

    delete user.password;

    return response.json({ user, token });
  }
}
