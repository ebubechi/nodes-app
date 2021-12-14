"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const dayjs_1 = __importDefault(require("dayjs"));
const log = (0, pino_1.default)({
    prettyPrint: true,
    base: {
        pid: false, //omitt process id from the log
    },
    timestamp: () => `,"time":"${(0, dayjs_1.default)().format()}`, //format time stamp
});
exports.default = log;
//# sourceMappingURL=index.js.map