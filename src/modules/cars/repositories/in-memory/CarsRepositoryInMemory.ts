import { ICreateCarsDTO } from '@modules/cars/dtos/ICreateCarsDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import { ICarsRepository } from '../ICarsRepository';

class CarsRepositoryInMemory implements ICarsRepository {
  private cars: Car[] = [];

  async findById(car_id: string): Promise<Car> {
    return this.cars.find(car => car.id === car_id);
  }

  async findAvailableCars(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    return this.cars.filter(car => {
      if (car.available) {
        if (brand) {
          return car.brand === brand;
        }

        if (category_id) {
          return car.category_id === category_id;
        }

        if (name) {
          return car.name === name;
        }

        return car;
      }

      return null;
    });
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async create(data: ICreateCarsDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data, { available: false });

    this.cars.push(car);

    return car;
  }
}

export { CarsRepositoryInMemory };
