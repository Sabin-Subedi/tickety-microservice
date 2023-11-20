import express, {Express} from "express";
import 'express-async-errors'
import morgan from "morgan";
import cors from "cors";
import { currentUserRouter } from "routes/current-user";
import { signInRouter } from "routes/signin";
import { signOutRouter } from "routes/signout";
import { signUpRouter } from "routes/signup";
import { errorHandler } from "middlewares/error-handler";
import { NotFoundError } from "errors/not-found-error";
import mongoose from "mongoose";
import cookieSession from "cookie-session"

const port = process.env.PORT || 3000

export const createServer = async () => {
  const app = express();
  app
    .set("trust proxy", true)
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .use(cookieSession({
      secure:true,
      signed:false,
    }))

    app.use(currentUserRouter)
    app.use(signInRouter)
    app.use(signOutRouter)
    app.use(signUpRouter)

    app.all('*',()=>{
      throw new NotFoundError();
    })

    app.use(errorHandler)

    try{
      await mongoose.connect('mongodb://auth-mongo-srv:27017/auth',{})
      console.log('Connected to MongoDB')
    }catch(err){
      console.log(err)
    }

  app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
  })
};
