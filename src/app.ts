import express from "express";
import config from "config";
import log from "./logger";
import connection from "./db/connect";
import routes from "./routes";
import { deserializeUser } from "./middleware";

const prodPort = process.env.PORT as unknown;

const port = prodPort as number || config.get("port") as number;
const host = config.get("host") as string;

const app = express(); 
app.use(deserializeUser); // calling the deserialize function on all routes requests that come into the application

// for json response and request with through api calls
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
 
// listening to a port and serving the uri
app.listen(port, host, () => {
  log.info(`server running at http://${host}:${port}`);
  connection();
  routes(app);
});
