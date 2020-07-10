import { startOfHour } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointments';
import AppError from '@shared/errors/AppError';
import IAppointmentRepository from '../repositories/IAppointmentsRepository';
import {injectable, inject} from 'tsyringe';

interface IRequest{
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {

  constructor(
    @inject('AppoitmentRepository')
    private appointmentsRepository: IAppointmentRepository){}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked!');
    }

    const appoitment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appoitment;
  }
}

export default CreateAppointmentService;
