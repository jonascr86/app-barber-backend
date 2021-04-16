import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import {inject, injectable} from 'tsyringe';

interface Request{
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ){}
  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if(!user){
      throw new AppError('User not founf')
    }

    delete user.password;

    return user;
  }
}

export default ShowProfileService;
