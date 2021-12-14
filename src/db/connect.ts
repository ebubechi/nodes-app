import mongoose from "mongoose";
import config from "config";
import log from "../logger";

function connection(): void {
  const dbUri = config.get("dbUri") as string;

  // 4. Connect to MongoDB
  mongoose.connect(dbUri, (err) => {
    if (err) {
      log.error(err.message);
      log.error(err);
    } else {
      log.info("Connected to MongoDb");
    }
  });
}

export default connection;
