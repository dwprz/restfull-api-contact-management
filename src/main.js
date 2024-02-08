import app from "./applications/app.js";
import { logger } from "./applications/logging.js";

app.listen(3300, () => {
  logger.info("application start");
});
