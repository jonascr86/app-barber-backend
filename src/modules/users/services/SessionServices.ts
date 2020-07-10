import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '@config/auth';
import Users from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import {injectable, inject} from 'tsyringe';

interface IRequest{
  password: string,
  email: string,
}

interface IResponse{
  user: Users,
  token: string,
}

@injectable()
class SessionServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ){}

  public async execute({ password, email }: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);

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

    return { user, token };
  }
}

export default SessionServices;
