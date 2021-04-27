import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentRepository
    );
  });

  it('should be able to list availabilitys months', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      date: new Date(2021,3,26,8,0,0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      date: new Date(2021,3,26,10,0,0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      date: new Date(2021,3,26,11,0,0)
    })

    await fakeAppointmentRepository.create({
      provider_id: 'user_id',
      date: new Date(2021,3,26,16,0,0)
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 26, 16).getTime();
    });

    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user_id',
      month: 4,
      year: 2021,
      day: 26
    })
    console.log(availability);
    expect(availability).toEqual(expect.arrayContaining([
      {"avaliable": false, "hour": 8},
      {"avaliable": false, "hour": 10},
      {"avaliable": false, "hour": 11},
      {"avaliable": false, "hour": 15},
      {"avaliable": false, "hour": 16},
      {"avaliable": true, "hour": 17}
    ]))

  })
})
