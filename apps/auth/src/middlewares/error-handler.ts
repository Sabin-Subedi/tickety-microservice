import { ErrorRequestHandler } from "express";
import { CustomError } from "~/errors/custom-error";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err.message);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(500).send({
    errors: [{ message: "Something went wrong" }],
  });
};
