import { ICreateSpecificationDTO } from '../../dtos/ICreateSpecificationDTO';
import { Specification } from '../../models/Specification';
import { ISpecificationsRepository } from '../ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  private static INSTANCE: SpecificationsRepository;

  private constructor() {
    this.specifications = [];
  }

  public static getInstance(): SpecificationsRepository {
    if (!SpecificationsRepository.INSTANCE) {
      SpecificationsRepository.INSTANCE = new SpecificationsRepository();
    }

    return SpecificationsRepository.INSTANCE;
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
