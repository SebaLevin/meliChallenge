import { Router } from 'express';
import axios from 'axios';
import { ProductsService } from '../../services/index.js'
import { ProductsController } from '../../controllers/index.js';
import { responseLoggerMiddleware, loggerMiddleware, pathParameterValidatorMiddleware } from '../../middlewares/index.js';

const productsService = new ProductsService(axios)
const productsController = new ProductsController(productsService);
const router = Router();

/**
 * @openapi
 * definitions:
 *   Paging:
 *     type: object
 *     properties:
 *       total:
 *         type: integer
 *       primary_results:
 *         type: integer
 *       offset:
 *         type: integer
 *       limit:
 *         type: integer
 *   Price:
 *     type: object
 *     properties:
 *       currency:
 *         type: string
 *       amount:
 *         type: number
 *       decimals:
 *         type: integer
 *   Item:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *       title:
 *         type: string
 *       price:
 *         $ref: "#/definitions/Price"
 *       picture:
 *         type: string
 *       condition:
 *         type: string
 *       free_shipping:
 *         type: boolean
 *   Response:
 *     type: object
 *     properties:
 *       paging:
 *         $ref: "#/definitions/Paging"
 *       categories:
 *         type: array
 *         items:
 *           type: string
 *       items:
 *         type: array
 *         items:
 *           $ref: "#/definitions/Item"
 * components:
 *    securitySchemes:
 *      ApiKeyAuth:     
 *         type: apiKey
 *         in: header
 *         name: x-auth-token
 * security:
 *     - ApiKeyAuth: [] 
 * /api/products/search/{siteId}:
 *   get:
 *     summary: >-
 *       Ruta para buscar productos basado en la query de busqueda.
 *     produces:
 *       - "application/json"
 *     tags:
 *       - Products
 *     securitySchemes:
 *       ApiKeyAuth:     
 *         type: apiKey
 *         in: header
 *         name: x-auth-token
 *     security:
 *     - ApiKeyAuth: [] 
 *     parameters:
 *       - in: path
 *         name: siteId
 *         schema:
 *           type: string
 *         required: true
 *         enum: [MLA, MLB, MLM]
 *         default: MLA
 *         description: Identificador del sitio. Puede tomar los valores MLA, MLB o MLM.
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: El nombre/valor del elemento que se quiere buscar
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         default: 0
 *         description: El número de elementos a omitir antes de comenzar a recopilar el conjunto de resultados.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 10
 *         description: La cantidad de elementos a devolver.
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         default: price_asc
 *         description: Ordena los resultados segun el precio en orden ascendente (price_asc) o descendente (price_desc)
 *     responses:
 *       '200':
 *         description: Petición exitosa.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/definitions/Response"
 *       '400':
 *         description: Limit y Offset debe ser un numero.
 *       '401':
 *         description: Falta token de autorizacion.
 *       '404':
 *         description: Producto no encontrado.
 *    
 */

router.get('/search/:siteId', loggerMiddleware, responseLoggerMiddleware, pathParameterValidatorMiddleware, productsController.getProducts());

export default router;