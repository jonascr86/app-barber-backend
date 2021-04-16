import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';


let fakeUserRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;


describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUserRepository)
  })

  it('should be able to show all providers exect one', async () => {

    const email = 'mail@user1.com';
    const name = 'Name User1';
    const password = '123456';

    const user = await fakeUserRepository.create(
      {
        email: email,
        name: name,
        password: password
      }
    )

    const email2 = 'mail@user2.com';
    const name2 = 'Name User2';
    const password2 = '123456';

    const user2 = await fakeUserRepository.create(
      {
        email: email,
        name: name,
        password: password
      }
    )

    const providers = await listProvidersService.execute({
      user_id: user2.id
    });

    providers.forEach(provider => {
      expect(provider.name).toBe(user.name);
    })
  })
})
