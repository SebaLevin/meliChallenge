import { Router } from 'express';
import productsRouter from './products/index.js';

const router = Router();

router.use('/api', productsRouter);

export default router;