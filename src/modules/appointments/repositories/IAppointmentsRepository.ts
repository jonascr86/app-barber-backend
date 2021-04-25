import Appointments from "../infra/typeorm/entities/Appointments";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentsDTO";
import IFindAllInMonthFromProviderDTO from "../dtos/IFindAllInMonthFromProviderDTO";

export default interface IAppointmentsRepository{
  create(date: ICreateAppointmentDTO): Promise<Appointments>;
  findByDate(date: Date): Promise<Appointments | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointments[]>;
}
