import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import SessionServices from './SessionServices';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let sessionUser: SessionServices;
let createUserService: CreateUserService;

describe('SessionUser', () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    sessionUser = new SessionServices(fakeUserRepository, fakeHashProvider);
    createUserService = new CreateUserService(fakeUserRepository, fakeHashProvider);
  })

  it('should be able to create a new session', async () => {

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

    const email = 'mailuserunknow@user.com';
    const password = '123456';

    expect(
      sessionUser.execute({
        email,
        password
      })).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to create session with a incorrect password', async () => {

    const email = 'mailuser@user.com';
    const name = 'Name User 2';
    const password = '123456';
    const passwordIncorrect = '23456';

    const user = await createUserService.execute(
      {
        email: email,
        name: name,
        password: password
      }
    )

    expect(
      sessionUser.execute({
        email,
        password: passwordIncorrect
      })).rejects.toBeInstanceOf(AppError);

  })
})
