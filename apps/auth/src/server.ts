import express, {Express} from "express";
import morgan from "morgan";
import cors from "cors";
import { currentUserRouter } from "routes/current-user";
import { signInRouter } from "routes/signin";
import { signOutRouter } from "routes/signout";
import { signUpRouter } from "routes/signup";

export const createServer: () => Express = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())

    app.use(currentUserRouter)
    app.use(signInRouter)
    app.use(signOutRouter)
    app.use(signUpRouter)

  return app;
};
