import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAutenticated';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';


const usersRouter = Router();
const userController = new UsersController();
const userAvatarController = new UserAvatarController();

usersRouter.post('/', userController.create);
usersRouter.patch('/avatar', ensureAuthenticated, userAvatarController.update);

export default usersRouter;
