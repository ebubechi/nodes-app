"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("./logger"));
const connect_1 = __importDefault(require("./db/connect"));
const routes_1 = __importDefault(require("./routes"));
const middleware_1 = require("./middleware");
const prodPort = process.env.port;
const port = prodPort || config_1.default.get("port");
const host = config_1.default.get("host");
const app = (0, express_1.default)();
app.use(middleware_1.deserializeUser); // calling the deserialize function on all routes requests that come into the application
// for json response and request with through api calls
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// listening to a port and serving the uri
app.listen(port, host, () => {
    logger_1.default.info(`server running at http://${host}:${port}`);
    (0, connect_1.default)();
    (0, routes_1.default)(app);
});
//# sourceMappingURL=app.js.map