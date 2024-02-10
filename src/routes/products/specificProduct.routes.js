import { Router } from 'express';
import axios from 'axios';
import { SpecificProductController } from '../../controllers/index.js';
import { loggerMiddleware, pathParameterValidatorMiddleware, responseLoggerMiddleware} from '../../middlewares/index.js';
import { SpecificProductService, ProductDescriptionService } from '../../services/index.js';

const router = Router();

const productDescriptionService = new ProductDescriptionService(axios);
const spcificProductService = new SpecificProductService(axios, productDescriptionService);
const specificProductController = new SpecificProductController(spcificProductService);

/**
* @openapi 
* definitions:
*   Author:
*     type: object
*     properties:
*       name:
*         type: string
*       lastname:
*         type: string
*   Price:
*     type: object
*     properties:
*       currency:
*         type: string
*       ammount:
*         type: integer
*       decimals:
*         type: integer
*   Product:
*     type: object
*     properties:
*       author:
*         $ref: "#/definitions/Author"
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
*       sold_quantity:
*         type: integer
*       description:
*         type: string
* /api/product/{id}:
*    get:
*      tags:
*      - Product
*      summary: >-
*        Ruta para buscar un producto especifico con su descripcion
*      produces:
*         - "application/json"
*      securitySchemes:
*         ApiKeyAuth:     
*           type: apiKey
*           in: header
*           name: x-auth-token
*      security:
*        - ApiKeyAuth: [] 
*      parameters:
*        - in: path
*          name: id
*          schema:
*            type: string
*          required: true
*          description: ID del producto que se quiere buscar
*      responses:
*        '200':
*          description: Successful response
*          content:
*            application/json:
*              schema:
*                $ref: "#/definitions/Product"
*        '400':
*          description: Id es requerido.
*        '401':
*          description: Falta token de autorizacion.
*        '404':
*          description: Producto no encontrado.
*/

router.get('/:id', loggerMiddleware, responseLoggerMiddleware, pathParameterValidatorMiddleware, specificProductController.getProduct());

export default router;