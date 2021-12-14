import logger from "pino";
import dayjs from "dayjs";

const log = logger({
  prettyPrint: true,
  base: {
    pid: false, //omitt process id from the log
  },
  timestamp: () => `,"time":"${dayjs().format()}`, //format time stamp
});

export default log;
