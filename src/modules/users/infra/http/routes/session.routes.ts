import { Router } from 'express';
import SessionServices from '@modules/users/services/SessionServices';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionRouter = Router();

sessionRouter.post('/', async (request, response) => {
  const usersRepository = new UsersRepository();
  const { email, password } = request.body;

  const sessionServices = new SessionServices(usersRepository);

  const { user, token } = await sessionServices.execute({
    email,
    password,
  });

  delete user.password;

  return response.json({ user, token });
});

export default sessionRouter;
