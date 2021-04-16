import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAutenticated';
import ProfileController from '../controllers/ProfileController';
import UserAvatarController from '../controllers/UserAvatarController';


const profileRouter = Router();
const profileController = new ProfileController();
const userAvatarController = new UserAvatarController();

profileRouter.use(ensureAuthenticated);

profileRouter.put('/', profileController.update);
profileRouter.get('/', profileController.show);

export default profileRouter;
