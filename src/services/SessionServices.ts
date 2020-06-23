import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Users from '../models/Users';
import auth from '../config/auth';
import AppError from '../errors/AppError';

interface Request{
  password: string,
  email: string,
}

interface Response{
  user: Users,
  token: string,
}

class SessionServices {
  public async execute({ password, email }: Request): Promise<Response> {
    const usersRepository = getRepository(Users);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordCorrect = await compare(password, user.password);

    if (!passwordCorrect) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });
    console.log(token);
    return { user, token };
  }
}

export default SessionServices;
