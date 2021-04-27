import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentRepository = new CreateAppointmentService(fakeAppointmentRepository);

    const appointment = await createAppointmentRepository.execute(
      {
        date: new Date(),
        provider_id: '123456',
        user_id: 'user'
      }
    )
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123456');
  })

  it('should not be able to create two appointments on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentRepository = new CreateAppointmentService(fakeAppointmentRepository);

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointmentRepository.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: 'user'
    })

    expect(
      createAppointmentRepository.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: 'user'
    })).rejects.toBeInstanceOf(AppError);

  })
})
