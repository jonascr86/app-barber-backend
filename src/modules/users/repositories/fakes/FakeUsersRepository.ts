import Users from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import {uuid} from 'uuidv4'
import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProvidersDTO';

class FakeUsersRepository implements IUsersRepository{
  private users: Users[] = [];

  public async findById(id: string): Promise<Users | undefined>{
    const user = this.users.find(user => user.id === id);
    return user;
  }

  public async findByEmail(email: string): Promise<Users | undefined>{
    const user = this.users.find(user => user.email === email);
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<Users>{
    const user = new Users();

    user.id = uuid();
    user.email = userData.email;
    user.name = userData.name;
    user.password = userData.password;
    this.users.push(user);

    return user;
  }

  public async save(user: Users): Promise<Users>{
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }

  public async findAllProviders({except_user_id}: IFindAllProvidersDTO):Promise<Users[]>{
    let users = this.users;
    if(except_user_id){
      users = this.users.filter(user => user.id !== except_user_id);
    }
    return users;
  }
}

export default FakeUsersRepository;
