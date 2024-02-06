import { Router } from 'express';
import axios from 'axios';
import { SpecificProductController } from '../../controllers/index.js';
import { loggerMiddleware, pathParameterValidatorMiddleware, responseLoggerMiddleware} from '../../middlewares/index.js';
import { SpecificProductService, ProductDescriptionService } from '../../services/index.js';

const router = Router();

const productDescriptionService = new ProductDescriptionService(axios);
const spcificProductService = new SpecificProductService(axios, productDescriptionService);
const specificProductController = new SpecificProductController(spcificProductService);

router.get('/:id', loggerMiddleware, responseLoggerMiddleware, pathParameterValidatorMiddleware, specificProductController.getProduct());

export default router;