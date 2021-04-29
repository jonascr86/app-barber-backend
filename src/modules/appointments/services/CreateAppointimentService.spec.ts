import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentRepository = new CreateAppointmentService(fakeAppointmentRepository);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 10, 15).getTime();
    })

    const appointment = await createAppointmentRepository.execute(
      {
        date: new Date(2021, 3, 10, 16),
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

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 10, 9).getTime();
    })

    const appointmentDate = new Date(2021, 3, 10, 11);

    await createAppointmentRepository.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: 'user'
    })

    await expect(
      createAppointmentRepository.execute({
        date: appointmentDate,
        provider_id: '123456',
        user_id: 'user'
    })).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to create appointment on the past time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentRepository = new CreateAppointmentService(fakeAppointmentRepository);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 10, 15).getTime();
    })

    await expect(
      createAppointmentRepository.execute({
        date: new Date(2021, 3, 10, 14),
        provider_id: '123456',
        user_id: 'user'
    })).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to create appointment whith same user as provider', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentRepository = new CreateAppointmentService(fakeAppointmentRepository);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 10, 15).getTime();
    })

    await expect(
      createAppointmentRepository.execute({
        date: new Date(2021, 3, 10, 16),
        provider_id: 'user',
        user_id: 'user'
    })).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to create appointment outside available hours', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentRepository = new CreateAppointmentService(fakeAppointmentRepository);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2021, 3, 10, 15).getTime();
    })

    await expect(
      createAppointmentRepository.execute({
        date: new Date(2021, 3, 10, 7),
        provider_id: 'provider',
        user_id: 'user'
    })).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointmentRepository.execute({
        date: new Date(2021, 3, 10, 18),
        provider_id: 'provider',
        user_id: 'user'
    })).rejects.toBeInstanceOf(AppError);

  })

})
