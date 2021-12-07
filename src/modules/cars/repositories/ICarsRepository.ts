import { ICreateCarsDTO } from '../dtos/ICreateCarsDTO';
import { Car } from '../infra/typeorm/entities/Car';

export interface ICarsRepository {
  create(data: ICreateCarsDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(car_id: string): Promise<Car>;
  findAvailableCars(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]>;
}
