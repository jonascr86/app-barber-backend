import { getRepository, Raw, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import IAppoitmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO';
import IFindAllInMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllInMonthFromProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class AppointmentsRepository implements IAppoitmentsRepository{
  private ormRepository: Repository<Appointment>;

  constructor(){
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({provider_id, user_id, date}: ICreateAppointmentDTO): Promise<Appointment>{
    const appointment = this.ormRepository.create({provider_id, user_id, date});

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findAllInMonthFromProvider({month, provider_id, year}: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const appointments = await this.ormRepository.find({
      where:{
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'MM-YYYY') = ${parsedMonth}-${year}`),
      }
    })
    return appointments;
  }

  public async findAllInDayFromProvider({day, month, provider_id, year}: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where:{
        provider_id,
        date: Raw(dateFieldName =>
          `to_char(${dateFieldName}, 'DD-MM-YYYY') = ${parsedDay}-${parsedMonth}-${year}`),
      }
    })
    return appointments;
  }
}

export default AppointmentsRepository;
