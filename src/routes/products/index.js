import { Router } from 'express';
import searchProductRoutes from './products.routes.js';
import searchSpecificProductRoutes from './specificProduct.routes.js';
import { tokenAuthMiddleware } from '../../middlewares/tokenAuth.middelwares.js';

const router = Router();

router.use('/products', tokenAuthMiddleware, searchProductRoutes);
router.use('/product', tokenAuthMiddleware, searchSpecificProductRoutes);

export default router;