// Not Found Error
const notFound = (req, res, next) => {
  const error = new Error(`Not found ${req?.originalUrl}`);
  res.status(404);
  next(error);
};


// Error Handler
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
}
