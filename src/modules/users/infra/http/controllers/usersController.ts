import { Request, Response } from "express";
import multer from 'multer';
import uplpadConfig from '@config/upload';
import CreateUserServices from '@modules/users/services/CreateUserService';
import {container} from 'tsyringe';
const upload = multer(uplpadConfig);

export default class UsersController{
  public async create(request: Request, response: Response): Promise<Response>{
    const { name, email, password } = request.body;

    const createUserService = container.resolve(CreateUserServices);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }
}
