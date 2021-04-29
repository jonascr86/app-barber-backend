import { startOfHour, isBefore, getHours } from 'date-fns';
import Appointments from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import {injectable, inject} from 'tsyringe';

interface IRequest{
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentRepository){}

  public async execute({ provider_id, user_id, date }: IRequest): Promise<Appointments> {

    const appointmentDate = startOfHour(date);
    const appointmentHour = getHours(appointmentDate);

    if(appointmentHour >= 18 || appointmentHour <= 7){
      throw new AppError("You can't create appontment outside available hours.")
    }

    if(provider_id === user_id){
      throw new AppError("You can't create appontment from yourself.")
    }

    if(isBefore(appointmentDate, Date.now())){
      throw new AppError("You can't create appointment on a past date.")
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked!');
    }

    const appoitment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appoitment;
  }
}

export default CreateAppointmentService;
