import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import SessionServices from './SessionServices';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('SessionUser', () => {
  it('should be able to create a new session', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const sessionUser = new SessionServices(fakeUserRepository, fakeHashProvider);
    const createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const email = 'mail@user.com';
    const name = 'Name User';
    const password = '123456';

    const user = await createUserService.execute(
      {
        email: email,
        password: password,
        name: name
      }
    )

    const response = await sessionUser.execute({
      email,
      password
    })

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })

  it('should not be able to create session with users unknow', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashPrivider = new FakeHashProvider();
    const sessionUser = new SessionServices(fakeUserRepository, fakeHashPrivider);

    const email = 'mailuserunknow@user.com';
    const password = '123456';

    expect(
      sessionUser.execute({
        email,
        password
      })).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to create session with a incorrect password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashPrivider = new FakeHashProvider();
    const createUserRepository = new CreateUserService(fakeUserRepository, fakeHashPrivider);
    const sessionServices = new SessionServices(fakeUserRepository, fakeHashPrivider);

    const email = 'mailuser@user.com';
    const name = 'Name User 2';
    const password = '123456';
    const passwordIncorrect = '23456';

    const user = await createUserRepository.execute(
      {
        email: email,
        name: name,
        password: password
      }
    )

    expect(
      sessionServices.execute({
        email,
        password: passwordIncorrect
      })).rejects.toBeInstanceOf(AppError);

  })
})
