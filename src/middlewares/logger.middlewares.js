import chalk from 'chalk';

export const loggerMiddleware = (req, res, next) => {
    const timestamp = `[${new Date().toISOString()}]`;
    const method = req.method;
    const url = req.url;
  
    console.log(chalk.bgCyan('Request'))
    console.log(`${chalk.gray(timestamp)} ${chalk.green(method)} ${chalk.blue(url)}`);
    console.log(chalk.yellow('Query Parameters:'), req.query);
    console.log(chalk.yellow('Route Parameters:'), req.params);
    console.log(chalk.cyan('Headers:'), req.headers);
   
    next();
}