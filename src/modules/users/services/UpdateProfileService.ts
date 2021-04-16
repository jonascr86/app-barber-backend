import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import {inject, injectable} from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request{
  user_id: string;
  name: string,
  email: string,
  password?: string,
  old_password?: string,

}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ){}
  public async execute({ name, email, password, old_password, user_id }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if(!user){
      throw new AppError('User not founf')
    }

    const isSameMail = await this.userRepository.findByEmail(email);
    if(isSameMail && user.id !== isSameMail.id){
      throw new AppError("Email alread in use for other user")
    }
    user.email = email;
    user.name = name;

    if(password && !old_password){
      throw new AppError('You need inform the old password to set a new password!')
    }

    if(!password && old_password){
      throw new AppError('New passord is clear!')
    }

    if(password && old_password){
      if(user.password){
        const checkOldPassword = this.hashProvider.compareHash(old_password, user.password)

        if(!checkOldPassword){
          throw new AppError("Password does match!")
        }
      }
    }

    if(password){
      user.password = await this.hashProvider.generateHash(password);
    }

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
