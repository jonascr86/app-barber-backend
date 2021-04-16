import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfileService: ShowProfileService;


describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  })

  it('should be able to show profile user', async () => {

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

    const profileUser = await showProfileService.execute({
      user_id: user.id,
    })

    expect(profileUser.name).toBe(user.name);
    expect(profileUser.email).toBe(user.email);
    expect(profileUser.password).toBe(user.password);

  })

  it('should be able to dont show profile if user non-exist', async () => {

    expect(showProfileService.execute({
      user_id: 'non-exist',
    })).rejects.toBeInstanceOf(AppError);
   })
})
