import {uuid} from 'uuidv4';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import { getDate, getMonth, getYear, isEqual } from 'date-fns';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class FakeAppointmentsRepository implements IAppoitmentsRepository{
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    )

    return findAppointment;
  }

  public async create({provider_id, user_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = new Appointment();

    Object.assign(appointment, {id: uuid(), date, provider_id, user_id});

    this.appointments.push(appointment);

    return appointment;

  }

  public async findAllInMonthFromProvider({month, provider_id, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
      appointment.provider_id === provider_id &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year

    )

    return appointments;
  }

  public async findAllInDayFromProvider({month, provider_id, year, day}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const appointments = this.appointments.filter(
      appointment =>
      appointment.provider_id === provider_id &&
      getDate(appointment.date) === day &&
      getMonth(appointment.date) + 1 === month &&
      getYear(appointment.date) === year

    )

    return appointments;
  }
}

export default FakeAppointmentsRepository;
