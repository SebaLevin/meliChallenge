import { Router } from 'express';
import axios from 'axios';
import {ProductsService} from '../../services/index.js'
import {ProductsController }from '../../controllers/index.js';
import { responseLoggerMiddleware, loggerMiddleware, pathParameterValidatorMiddleware } from '../../middlewares/index.js';

const productsService = new ProductsService(axios)
const productsController = new ProductsController(productsService);
const router = Router();

/**
* @swagger 
* /api/products/search/{siteId}:
*    get:
*      tags:
*      - Products
*      summary: >-
*        Gets a list of products based on the query search and siteId
*      responses:
*        '200':
*          description: Successful response
*/

router.get('/search/:siteId', loggerMiddleware, responseLoggerMiddleware, pathParameterValidatorMiddleware, productsController.getProducts());

export default router;