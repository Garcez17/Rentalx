import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a specification to the car', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'car',
      description: 'description car',
      brand: '123',
      category_id: 'category_id',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    const specification = await specificationsRepositoryInMemory.create({
      description: 'test',
      name: 'test',
    });

    const car = await createCarSpecificationUseCase.execute({
      car_id: car1.id,
      specifications_id: [specification.id],
    });

    expect(car.specifications).toEqual([specification]);
  });

  it('should not be able to add a specification an non-existent car', async () => {
    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id: '123',
        specifications_id: ['123'],
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
