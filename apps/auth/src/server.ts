import consola from "consola";
import cookieSession from "cookie-session";
import cors from "cors";
import express from "express";
import "express-async-errors";
import mongoose from "mongoose";
import morgan from "morgan";
import { NotFoundError } from "~/errors/not-found-error";
import { errorHandler } from "~/middlewares/error-handler";
import { signInRouter } from "~/routes/signin";
import { signOutRouter } from "~/routes/signout";
import { signUpRouter } from "~/routes/signup";
import { currentUserRouter } from "./routes/current-user";

const port = process.env.PORT || 3000;

export const createServer = async () => {
  consola.start("Starting server");
  const app = express();
  app
    .set("trust proxy", true)
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .use(
      cookieSession({
        secure: true,
        signed: false,
      })
    );

  app.use(currentUserRouter);
  app.use(signInRouter);
  app.use(signOutRouter);
  app.use(signUpRouter);

  app.all("*", () => {
    throw new NotFoundError();
  });

  app.use(errorHandler);

  consola.start("Connecting to MongoDB");
  await mongoose.connect("mongodb://auth-mongo-srv:27017/auth", {});
  consola.success("Connected to MongoDB");

  app.listen(port, () => {
    consola.info(`Listening on port ${port}!`);
  });
};
