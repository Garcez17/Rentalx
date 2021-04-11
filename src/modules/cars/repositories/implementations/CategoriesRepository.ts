import { ICreateCategoryDTO } from '../../dtos/ICreateCategoryDTO';
import { Category } from '../../models/Category';
import { ICategoriesRepository } from '../ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  private static INSTANCE: CategoriesRepository;

  private constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoriesRepository {
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository();
    }

    return CategoriesRepository.INSTANCE;
  }

  public create(data: ICreateCategoryDTO): Category {
    const category = new Category();

    Object.assign(category, data);

    this.categories.push(category);

    return category;
  }

  public list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    return this.categories.find(category => category.name === name);
  }
}

export { CategoriesRepository };
