import { Router } from 'express';
import searchProductRoutes from './products.routes.js';
import searchSpecificProductRoutes from './specificProduct.routes.js';
import { errorHandler } from '../../middlewares/errorHandler.middleware.js';

const router = Router();

router.use('/products', errorHandler, searchProductRoutes);
router.use('/product', errorHandler, searchSpecificProductRoutes);

export default router;