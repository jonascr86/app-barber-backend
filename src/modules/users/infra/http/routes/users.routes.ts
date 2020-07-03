import { Router } from 'express';
import multer from 'multer';
import uplpadConfig from '@config/upload';
import CreateUserServices from '@modules/users/services/CreateUserService';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAutenticated';
import UpdateUsersAvatarService from '@modules/users/services/UpdateUserAvatarServece';

const usersRouter = Router();
const upload = multer(uplpadConfig);

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUserService = new CreateUserServices();

  const user = await createUserService.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),
  async (request, response) => {
    const updateUserAvatar = new UpdateUsersAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  });

export default usersRouter;
