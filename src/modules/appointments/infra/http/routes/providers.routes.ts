import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAutenticated';
import { Router } from 'express';
import ProvidersController from '../controllers/ProvidersController';


const providersRouter = Router();
const providesrController = new ProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providesrController.index);

export default providersRouter;
