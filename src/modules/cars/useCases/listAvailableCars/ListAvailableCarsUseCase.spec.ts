import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCars: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('listAvailableCars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCars = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'car',
      description: 'description car',
      brand: '123',
      category_id: 'category_id',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    car1.available = true;

    await carsRepositoryInMemory.create({
      name: 'car',
      description: 'description car',
      brand: '123',
      category_id: 'category_id',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    const cars = await listAvailableCars.execute({});

    expect(cars).toEqual([car1]);
  });

  it('should be able to list all available cars by name', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'car_1',
      description: 'description car',
      brand: '123',
      category_id: 'category_id',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    car1.available = true;

    const car2 = await carsRepositoryInMemory.create({
      name: 'car_2',
      description: 'description car',
      brand: '123',
      category_id: 'category_id_2',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    car2.available = true;

    const cars = await listAvailableCars.execute({
      name: 'car_1',
    });

    expect(cars).toEqual([car1]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'car_1',
      description: 'description car',
      brand: '1234',
      category_id: 'category_id',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    car1.available = true;

    const car2 = await carsRepositoryInMemory.create({
      name: 'car_1',
      description: 'description car',
      brand: '123',
      category_id: 'category_id_2',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    car2.available = true;

    const cars = await listAvailableCars.execute({
      brand: '1234',
    });

    expect(cars).toEqual([car1]);
  });

  it('should be able to list all available cars by category_id', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'car_1',
      description: 'description car',
      brand: '123',
      category_id: 'category_id',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    car1.available = true;

    const car2 = await carsRepositoryInMemory.create({
      name: 'car_1',
      description: 'description car',
      brand: '123',
      category_id: 'category_id_2',
      daily_rate: 123,
      fine_amount: 123,
      license_plate: 'ABC-1234',
    });

    car2.available = true;

    const cars = await listAvailableCars.execute({
      category_id: 'category_id_2',
    });

    expect(cars).toEqual([car2]);
  });
});
