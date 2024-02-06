import express from "express";
import Routes from "./src/routes/index.js";
import{ swaggerDocs } from "./swagger.js";
import { tokenAuthMiddleware } from "./src/middlewares/index.js";
import chalk from "chalk";

const app = express();

const PORT = process.env.PORT || 3000;

//app.use(tokenAuthMiddleware);

/**
 * @openapi
 * /
 *   get:
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */
app.get('/', (req, res) => {
    res.send('Hello World!');
})

app.use("/", Routes);

app.listen(PORT, () => {
    console.log("🤠 Server lsitening on port:", chalk.cyan(PORT));
    swaggerDocs(app, PORT);
})