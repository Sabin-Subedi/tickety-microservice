import { RequestValidationError } from "errors/request-validation-error";
import { Request, Response, Router } from "express";
import { body, matchedData, validationResult } from "express-validator";

const router = Router();

router.post("/api/users/signup",[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min:4, max:20}).withMessage('Password must be between 4 and 20 characters')
], (req:Request, res:Response) => {

    const result = validationResult(req)
    if(!result.isEmpty()){
        throw new RequestValidationError(result.array());
    }

    const {email, password} = req.body;
    console.log('Creating a user ...', email, password);
    res.send({});
})

export { router as signUpRouter };


