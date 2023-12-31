import { Request, Response, Router } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError } from "~/errors/bad-request-error";
import { RequestValidationError } from "~/errors/request-validation-error";
import { validateRequest } from "~/middlewares/request-validation";
import User from "~/models/user";
import { Password } from "~/services/password";

const router = Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordMatch = await Password.compare(user.password, password);
    if (!passwordMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    req.session = {
      jwt: jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!),
    };

    res.status(200).send(user);
  }
);

export { router as signInRouter };
