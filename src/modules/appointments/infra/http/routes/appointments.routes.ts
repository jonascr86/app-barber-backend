import { Router } from 'express';
import AppointsController from '../controllers/appointmentesController';


const appointmentRouter = Router();
const appointerController = new AppointsController();

appointmentRouter.post('/', appointerController.create);

export default appointmentRouter;
