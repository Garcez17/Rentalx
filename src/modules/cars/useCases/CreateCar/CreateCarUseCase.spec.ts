import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCar: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('CreateCar', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCar = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCar.execute({
      name: 'car',
      description: 'description car',
      brand: '123',
      category_id: 'category_id',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a new car with existent license plate', async () => {
    await createCar.execute({
      name: 'car',
      description: 'description car',
      brand: '123',
      category_id: 'category_id',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    await expect(
      createCar.execute({
        name: 'car',
        description: 'description car',
        brand: '123',
        category_id: 'category_id',
        daily_rate: 123,
        fine_amount: 123,
        license_plate: 'ABC-1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCar.execute({
      name: 'car',
      description: 'description car',
      brand: '123',
      category_id: 'category_id',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    expect(car.available).toBeTruthy();
  });
});
