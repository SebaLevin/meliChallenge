import chalk from "chalk";

export const responseLoggerMiddleware = (req, res, next) => {
  
    const originalJson = res.json;
    const timestamp = new Date().toISOString()

    res.json = function (body) {
    
      console.log(chalk.bgCyan('Response'))
      console.log(`${chalk.gray(timestamp)}`);
      console.log(chalk.yellow('Status Code:'), res.statusCode);
      console.log(chalk.yellow('Response Body:'), body);
      
      originalJson.call(this, body);
    };
  
    next();
  };