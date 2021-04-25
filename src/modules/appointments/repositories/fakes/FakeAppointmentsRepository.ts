import {uuid} from 'uuidv4';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import { getMonth, getYear, isEqual } from 'date-fns';

class FakeAppointmentsRepository implements IAppoitmentsRepository{
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = this.appointments.find(
      appointment => isEqual(appointment.date, date)
    )

    return findAppointment;
  }

  public async create({provider_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = new Appointment();

    Object.assign(appointment, {id: uuid(), date, provider_id});

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
}

export default FakeAppointmentsRepository;
