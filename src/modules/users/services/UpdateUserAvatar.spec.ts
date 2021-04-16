import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/fakes/FakeStorageProvider';
import UpdateUsersAvatarService from './UpdateUsersAvatarService';

let fakeUserRepository: FakeUserRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUsersAvatarService;


describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUsersAvatarService(fakeUserRepository, fakeStorageProvider);
  })

  it('should be able to update avatar from user', async () => {

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

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });

    expect(user.avatar).toBe('avatar.jpg');
  })

  it('should not be able to update avatar not user', async () => {

    expect(
      updateUserAvatar.execute({
        user_id: 'user.id',
        avatarFileName: 'avatar.jpg'
      }),
    ).rejects.toBeInstanceOf(AppError);

  })

  it('should deleta old avatar when updating new one', async () => {

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

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

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg'
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg'
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  })
})
