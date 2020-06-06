import { Router } from 'express';
import SessionServices from '../services/SessionServices';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const sessionServices = new SessionServices();

  const { user, token } = await sessionServices.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
