const errorResult = (error: any, res: any, statusCode: any) => {
  if (error != null && error instanceof Error) {
    return res.status(statusCode).send({
      status: statusCode,
      message: error.message,
      errors: error,
    });
  }
  return res.status(statusCode).json({
    status: statusCode,
    message: "internal server error",
    errors: error,
  });
};

export default errorResult;
