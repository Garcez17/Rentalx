import { AppError } from '@shared/errors/AppError';

import { CategoriesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategory: CreateCategoryUseCase;

describe('CreateCategory', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  });

  it('should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Description Test',
    };

    await createCategory.execute(category);

    const categoryRepo = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryRepo).toHaveProperty('id');
  });

  it('should not be able to create two categories with the same name', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category Description Test',
    };

    await createCategory.execute(category);

    await expect(createCategory.execute(category)).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
