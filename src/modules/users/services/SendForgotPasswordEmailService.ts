import Users from '@modules/users/infra/typeorm/entities/Users';
import path from 'path'
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTotensRepository: IUserTokensRepository,
  ) { }
  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if(!user){
      throw new AppError('User does not exists.');
    }

    const userToken = await this.userTotensRepository.generate(user.id);
    const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')
    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[Barber] Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password/token=${userToken.token}`,
        }
      }
    })
  }

}

export default SendForgotPasswordEmailService;
