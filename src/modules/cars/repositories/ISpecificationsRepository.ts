import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../infra/typeorm/entities/Specification';

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  create(data: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationsRepository };
