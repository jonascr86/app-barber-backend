import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailPrivider';
import AppError from '@shared/errors/AppError';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotEmailPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider()
    fakeUserTokensRepository = new FakeUserTokensRepository();
    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
    fakeUsersRepository, fakeMailProvider, fakeUserTokensRepository);
  })

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      email: 'mail@user.com',
      name: 'User Name',
      password: '123456'
    })

    const email = 'mail@user.com';

    await sendForgotPasswordEmailService.execute(
      {
        email: email,
      }
    )

    expect(sendMail).toHaveBeenCalled();
  })

  it('should not be able to recover a non-existing user password', async() =>{
    const email = 'mail@user.com';

    await expect(
      sendForgotPasswordEmailService.execute({
        email: email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  })

  it('should generate a forgot password token', async() =>{
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      email: 'mail@user.com',
      name: 'User Name',
      password: '123456'
    })

    const email = 'mail@user.com';

    await sendForgotPasswordEmailService.execute(
      {
        email: email,
      }
    )

    expect(generateToken).toHaveBeenCalledWith(user.id);
  })
})
