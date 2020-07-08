import { hash } from 'bcryptjs';
import Users from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest{
  name: string;
  email: string;
  password: string;
}

class CreateUserServices {
  constructor(private usersRepository: IUsersRepository){}
  public async execute({ name, email, password }: IRequest): Promise<Users> {

    const findUserSameMail = await this.usersRepository.findByEmail(email);

    if (findUserSameMail) {
      throw new AppError('Email addres already used!');
    }

    const hashPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserServices;
