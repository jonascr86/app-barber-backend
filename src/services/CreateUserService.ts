import { getCustomRepository, getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Users from '../models/Users';
import AppError from '../errors/AppError';

interface Request{
  name: string;
  email: string;
  password: string;
}

class CreateUserServices {
  public async execute({ name, email, password }: Request): Promise<Users> {
    const usersRepository = getRepository(Users);

    const findUserSameMail = await usersRepository.findOne({
      where: { email },
    });

    if (findUserSameMail) {
      throw new AppError('Email addres already used!');
    }

    const hashPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserServices;
