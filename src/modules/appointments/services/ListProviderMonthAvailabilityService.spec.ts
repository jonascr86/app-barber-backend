import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import ListProviderMonthAvailabilityService from './ListProviderMonthAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderMonthAvailability: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderMonthAvailability = new ListProviderMonthAvailabilityService(
      fakeAppointmentRepository
    );
  });

  it('should be able to list availabilitys months', async () => {
    for (let i = 8; i <= 17; i++) {
      await fakeAppointmentRepository.create({
        provider_id: 'user_id',
        date: new Date(2021,3,26,i,0,0)
      })
    }

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      date: new Date(2021,4,27,8,0,0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      date: new Date(2021,4,28,10,0,0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      date: new Date(2021,4,29,8,0,0)
    })

    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user_id',
      month: 4,
      year: 2021
    })

    expect(availability).toEqual(expect.arrayContaining([
      {"avaliable": true, "day": 1},
      {"avaliable": true, "day": 2},
      {"avaliable": true, "day": 3},
      {"avaliable": true, "day": 4},
      {"avaliable": true, "day": 5},
      {"avaliable": true, "day": 6},
      {"avaliable": true, "day": 7},
      {"avaliable": true, "day": 8},
      {"avaliable": true, "day": 9},
      {"avaliable": true, "day": 10},
      {"avaliable": true, "day": 11},
      {"avaliable": true, "day": 12},
      {"avaliable": true, "day": 13},
      {"avaliable": true, "day": 14},
      {"avaliable": true, "day": 15},
      {"avaliable": true, "day": 16},
      {"avaliable": true, "day": 17},
      {"avaliable": true, "day": 18},
      {"avaliable": true, "day": 19},
      {"avaliable": true, "day": 20},
      {"avaliable": true, "day": 21},
      {"avaliable": true, "day": 22},
      {"avaliable": true, "day": 23},
      {"avaliable": true, "day": 24},
      {"avaliable": true, "day": 25},
      {"avaliable": false, "day": 26},
      {"avaliable": true, "day": 27},
      {"avaliable": true, "day": 28},
      {"avaliable": true, "day": 29},
      {"avaliable": true, "day": 30}
    ]))

  })
})
