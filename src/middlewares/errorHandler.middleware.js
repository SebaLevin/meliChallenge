import  MyCustomError from "../errors/custom.error.js";

export const errorHandler = (err, req, res, next) => {

  let statusCode = err.statusCode || 500;
  let message = 'Internal Server Error';

  if (statusCode === 404) {
    message = 'Page Not Found';
  } else if (err instanceof MyCustomError) {
    // Handle other known errors
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error(err);

  return res.status(statusCode).json({ error: { message } });
};
