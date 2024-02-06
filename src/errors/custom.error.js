class MyCustomError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = this.constructor.name;
      this.statusCode = statusCode || 500;
    }
  }

  export default MyCustomError;