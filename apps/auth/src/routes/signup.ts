import { Request, Response, Router } from "express";
import { body, matchedData, validationResult } from "express-validator";

import jwt from "jsonwebtoken";
import { BadRequestError } from "~/errors/bad-request-error";
import { RequestValidationError } from "~/errors/request-validation-error";
import User from "~/models/user";

const router = Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  async (req: Request, res: Response) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      throw new RequestValidationError(result.array());
    }

    const { email, password } = matchedData(req, { includeOptionals: false });
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email already in use.");
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = { jwt: userJwt };

    res.status(200).send(user);
  }
);

export { router as signUpRouter };
