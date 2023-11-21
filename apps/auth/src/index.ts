import consola from "consola";
import { createServer } from "./server";

try {
  createServer();
} catch (err: any) {
  consola.error(err?.message);
  console.error(err);
}
