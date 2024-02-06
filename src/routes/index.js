import { Router } from 'express';
import productsRouter from './products/index.js';
import { errorHandler } from '../middlewares/errorHandler.middleware.js';

const router = Router();

router.use('/api', productsRouter);

export default router;