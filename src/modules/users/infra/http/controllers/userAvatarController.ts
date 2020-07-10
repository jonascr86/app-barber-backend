import { Request, Response } from "express";
import multer from 'multer';
import uplpadConfig from '@config/upload';
import UpdateUsersAvatarService from '@modules/users/services/UpdateUsersAvatarService';
import {container} from 'tsyringe';
const upload = multer(uplpadConfig);

export default class UserAvatarController{
  public async update(request: Request, response: Response): Promise<Response>{
    const updateUserAvatar = container.resolve(UpdateUsersAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  }
}
