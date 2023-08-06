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

const responesData = (
  statusCode: number,
  message: string | null,
  error: any | null,
  data: any | null
) => {
  if (error != null && error instanceof Error) {
    return { statusCode, message: error.message, errors: error, data: null };
  }
  return { statusCode, message, errors: error, data };
};

export { errorResult, responesData };
