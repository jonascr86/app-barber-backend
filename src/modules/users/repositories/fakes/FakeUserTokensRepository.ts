import Users from '@modules/users/infra/typeorm/entities/Users';
import {uuid} from 'uuidv4'
import IUserTokensRepositorie from '../IUserTokensRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

export default class FakeUserTokensRepository implements IUserTokensRepositorie{
  private userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken>{
    const userToken = new UserToken();

    Object.assign(userToken,{
      id: uuid(),
      token: uuid(),
      user_id,
    })

    this.userTokens.push(userToken)

    return userToken;
  }
}
