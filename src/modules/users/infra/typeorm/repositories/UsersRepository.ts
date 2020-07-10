import { getRepository, Repository } from 'typeorm';
import Users from '../entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository{
  private ormRepository: Repository<Users>;

  constructor(){
    this.ormRepository = getRepository(Users);
  }

  public async findByDate(date: Date): Promise<Users | undefined> {
    const findUser = await this.ormRepository.findOne({
      where: { date },
    });

    return findUser;
  }

  public async findById(id: string): Promise<Users | undefined>{
    const user = await this.ormRepository.findOne(id);
    return user;
  }
  public async findByEmail(email: string): Promise<Users | undefined>{
    const user = await this.ormRepository.findOne({where: {email}});
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<Users>{
    const User = this.ormRepository.create(userData);

    await this.ormRepository.save(User);

    return User;
  }

  public async save(user: Users): Promise<Users>{
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
