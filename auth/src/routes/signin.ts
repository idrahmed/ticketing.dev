import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from 'jsonwebtoken'
import { BadRequestError, validateRequest } from "@iatickets-dev/common";
import { User } from "../models/user";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password").trim().notEmpty().withMessage("Enter your password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {email, password} = req.body

    // checking if email already exists in db.
    const existingUser = await User.findOne({email})
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials')
    }

    // checking if entered password matches the one in db.
    const passwordsMatch = await Password.compare(existingUser.password, password)

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials')
    }

    // generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    // store it on the session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
