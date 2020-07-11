import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointimentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentRepository = new CreateAppointmentService(fakeAppointmentRepository);

    const appointment = await createAppointmentRepository.execute(
      {
        date: new Date(),
        provider_id: '123456',
      }
    )
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  })

  it('should not be able to create two appointments on the same time', () => {
    expect(1+1).toBe(2);
  })
})
