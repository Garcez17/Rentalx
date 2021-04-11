import { ICreateCategoryDTO } from '../dtos/ICreateCategoryDTO';
import { Category } from '../models/Category';

interface ICategoriesRepository {
  list(): Category[];
  findByName(name: string): Category;
  create(data: ICreateCategoryDTO): void;
}

export { ICategoriesRepository };
