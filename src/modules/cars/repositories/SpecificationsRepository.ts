import { ICreateSpecificationDTO } from '../dtos/ICreateSpecificationDTO';
import { Specification } from '../models/Specification';
import { ISpecificationsRepository } from './ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  findByName(name: string): Specification {
    return this.specifications.find(
      specification => specification.name === name,
    );
  }

  create(data: ICreateSpecificationDTO): void {
    const specification = new Specification();

    Object.assign(specification, data);

    this.specifications.push(specification);
  }
}

export { SpecificationsRepository };
