import { Router } from 'express';
import SessionServices from '@modules/users/services/SessionServices';
import {container} from 'tsyringe';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const sessionServices = container.resolve(SessionServices);

  const { user, token } = await sessionServices.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
