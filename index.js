import express from "express";
import routes from "./src/routes/index.js";
import { swaggerDocs } from "./swagger.js";
import chalk from "chalk";

const app = express();

const PORT = 3000;

app.use(routes);

app.listen(PORT, () => {
    console.log("🤠 Server lsitening on port:", chalk.cyan(PORT));
    swaggerDocs(app, PORT);
})