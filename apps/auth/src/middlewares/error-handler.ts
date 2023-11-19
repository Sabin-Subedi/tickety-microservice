import { CustomError } from "errors/custom-error";
import { ErrorRequestHandler } from "express";
import { Result, ValidationError } from "express-validator";




export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if(err instanceof CustomError){
        return res.status(err.statusCode).send({ errors:err.serializeErrors() });
    }

    res.status(500).send({
        errors: [{ message: 'Something went wrong' }]
    });
}