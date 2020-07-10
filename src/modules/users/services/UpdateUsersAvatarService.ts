import path from 'path';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import {inject, injectable} from 'tsyringe';

interface Request{
  user_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUsersAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository
  ){}
  public async execute({ user_id, avatarFileName }: Request): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFileName;
    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUsersAvatarService;
