import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailPrivider';
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from "../services/ResetPasswordService";
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();
    resetPassword = new ResetPasswordService(fakeUsersRepository,
    fakeUserTokensRepository, fakeHashProvider);
  })

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      email: 'mail@user.com',
      name: 'User Name',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id);
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    await resetPassword.execute({
      password: '147147',
      token,
    });

    const updatedUser = await fakeUsersRepository.findById(user.id);
    expect(generateHash).toHaveBeenCalledWith('147147');
    expect(updatedUser?.password).toBe('147147');
  })

  it('Should not be able to reset the password with non-exixting token', async() => {
    await expect(
      resetPassword.execute({
        token: 'non-existing',
        password:'123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  })

  it('Should not be able to reset the password with non-exixting user', async() => {
  const { token } = await fakeUserTokensRepository.generate('non-existing-user');

      await expect(
        resetPassword.execute({
          token,
          password:'123456',
        })
      ).rejects.toBeInstanceOf(AppError);
  })

  it('Should not be able to reset the password if passed more than two hours', async() => {
    const user = await fakeUsersRepository.create({
      email: 'mail@user.com',
      name: 'User Name',
      password: '123456'
    })

    const { token } = await fakeUserTokensRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() =>{
      const custonDate = new Date();
      return custonDate.setHours(custonDate.getHours() + 3);
    })

    await expect(resetPassword.execute({
      password:'147147',
      token,
    })).rejects.toBeInstanceOf(AppError);
  })

})

