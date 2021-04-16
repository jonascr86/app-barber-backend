import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import UpdateProfileService from './UpdateProfileService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;


describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(fakeUserRepository, fakeHashProvider);
  })

  it('should be able to update profile user', async () => {

    const email = 'mail@user.com';
    const name = 'Name User';
    const password = '123456';

    const user = await fakeUserRepository.create(
      {
        email: email,
        name: name,
        password: password
      }
    )

    const updatedUser = await updateProfileService.execute({
      name: 'New Name',
      email: 'newemail@mail.user',
      password: '43210',
      user_id: user.id,
    })

    expect(updatedUser?.name).toBe('New Name');
    expect(updatedUser?.email).toBe('newemail@mail.user');
    expect(updatedUser?.password).toBe('43210');

  })
})
