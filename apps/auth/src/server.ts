import express, {Express} from "express";
import morgan from "morgan";
import cors from "cors";

export const createServer: () => Express = () => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get("/healthz", (req, res) => {
      return res.json({ ok: true });
    })

    app.get('/api/users/currentuser', (req, res) => {
      res.send('Hi there!');
    })

  return app;
};
