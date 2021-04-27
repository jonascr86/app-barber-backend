import { getDate, getDaysInMonth, getHours, isAfter } from 'date-fns';
import {inject, injectable} from 'tsyringe';
import Appointments from '../infra/typeorm/entities/Appointments';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface Request{
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

type IResponse = Array<{
  hour: number;
  avaliable: boolean
}>

@injectable()
class ListProviderDayAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ){}
  public async execute({ provider_id, day, month, year }: Request): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      { provider_id, day, month, year }
    );

    const hourStart = 8;

    const eachHourArray = Array.from(
      {length: 10},
      (value, index) => index + hourStart
    );

    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour)


      return {
        hour,
        avaliable: !hasAppointmentInHour && isAfter(compareDate, currentDate)
      }
    })
    return availability
  }
}

export default ListProviderDayAvailabilityService;
