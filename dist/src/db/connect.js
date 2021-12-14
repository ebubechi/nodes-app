"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const logger_1 = __importDefault(require("../logger"));
function connection() {
    const dbUri = config_1.default.get("dbUri");
    // 4. Connect to MongoDB
    mongoose_1.default.connect(dbUri, (err) => {
        if (err) {
            logger_1.default.error(err.message);
            logger_1.default.error(err);
        }
        else {
            logger_1.default.info("Connected to MongoDb");
        }
    });
}
exports.default = connection;
//# sourceMappingURL=connect.js.map