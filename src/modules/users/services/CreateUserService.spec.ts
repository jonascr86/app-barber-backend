import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserRepository = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const email = 'mail@user.com';
    const name = 'Name User';
    const password = '123456';

    const user = await createUserRepository.execute(
      {
        email: email,
        name: name,
        password: password
      }
    )
    expect(user).toHaveProperty('id');
    expect(user.email).toBe(email);
    expect(user.name).toBe(name);
  })

  it('should not be able to create two users on the same email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserRepository = new CreateUserService(fakeUserRepository, fakeHashProvider);

    const email = 'mailuser@user.com';
    const name = 'Name User 2';
    const password = '123456';

    const user = await createUserRepository.execute(
      {
        email: email,
        name: name,
        password: password
      }
    )

    expect(
      createUserRepository.execute({
        email: email,
        name: name,
        password: password
    })).rejects.toBeInstanceOf(AppError);

  })
})
