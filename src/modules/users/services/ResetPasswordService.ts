import Users from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import { addHours, isAfter } from 'date-fns'
interface IRequest {
  password: string;
  token: string
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTotensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) { }
  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTotensRepository.findByToken(token);

    if(!userToken){
      throw new AppError('User token does not exists.');
    }
    const user = await this.usersRepository.findById(userToken?.user_id);
    if(!user){
      throw new AppError('User does not exists.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);
    await this.usersRepository.save(user);
  }

}

export default ResetPasswordService;
