import Appointments from "../infra/typeorm/entities/Appointments";
import ICreateAppointmentDTO from "../dtos/ICreateAppointmentsDTO";

export default interface IAppointmentsRepository{
  create(date: ICreateAppointmentDTO): Promise<Appointments>;
  findByDate(date: Date): Promise<Appointments | undefined>;
}
