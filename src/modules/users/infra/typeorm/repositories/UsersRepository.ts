import { getRepository, Not, Repository } from 'typeorm';
import Users from '../entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import usersRouter from '../../http/routes/users.routes';
import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';

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

  public async findAllProviders({except_user_id}: IFindAllProvidersDTO):Promise<Users[]>{
    let users: Users[];

    if(except_user_id){
      users = await this.ormRepository.find({
        where:{
          id: Not(except_user_id)
        }
      });
    }else{
      users = await this.ormRepository.find();
    }
    return users;
  }
}

export default UsersRepository;
