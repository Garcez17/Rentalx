import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../models/Specification';

interface ISpecificationsRepository {
  findByName(name: string): Specification;
  create(data: ICreateSpecificationDTO): void;
}

export { ISpecificationsRepository };
