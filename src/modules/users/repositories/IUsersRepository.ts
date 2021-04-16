import Users from "../infra/typeorm/entities/Users";
import ICreateUserDTO from "../dtos/ICreateUserDTO";
import IFindAllProvidersDTO from "@modules/appointments/dtos/IFindAllProvidersDTO";

export default interface IUsersRepository{
  findAllProviders(data: IFindAllProvidersDTO):Promise<Users[]>;
  findById(id: string): Promise<Users | undefined>;
  findByEmail(email: string): Promise<Users | undefined>;
  create(data: ICreateUserDTO): Promise<Users>;
  save(user: Users): Promise<Users>;
}
