import { Router } from 'express';
import SessionController from '../controllers/sessionController';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post('/', sessionController.createSession);

export default sessionRouter;
