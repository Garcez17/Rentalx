import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../entities/Specification';

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  create(data: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationsRepository };
