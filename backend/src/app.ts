import dotenv from 'dotenv';
import log4js from 'log4js';
import { createExpressServer } from 'routing-controllers';
import * as controllers from './controllers';

dotenv.config();

const logger = log4js.getLogger();
logger.level = process.env.LOG_LEVEL ?? 'error';

const controllerInstances = [];
for (const name in controllers) {
  const Controller = (controllers as any)[name];
  controllerInstances.push(Controller);
  console.log(controllerInstances);
}

const app = createExpressServer({
  controllers: controllerInstances
});

const port = process.env.PORT ?? 3000;
app.listen(port, () => console.log(`Running on port ${port}`));
