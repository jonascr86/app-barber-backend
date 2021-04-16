import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import {inject, injectable} from 'tsyringe';

interface Request{
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ){}
  public async execute({ user_id }: Request): Promise<User[]> {
    const users = await this.userRepository.findAllProviders({
      except_user_id: user_id
    });

    return users;
  }
}

export default ListProvidersService;
