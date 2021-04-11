import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (req, res) => {
  return createSpecificationController.handle(req, res);
});

// specificationsRoutes.get('/', (req, res) => {
//   const categories = specificationsRepository.list();

//   return res.status(201).json(categories);
// });

export { specificationsRoutes };
