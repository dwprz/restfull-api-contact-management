import app from "./applications/app.js";
import { logger } from "./applications/logging.js";

app.listen(3000, () => {
  logger.info("application start");
});
