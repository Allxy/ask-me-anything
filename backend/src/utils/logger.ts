import { configure, getLogger } from 'log4js';

configure({
  appenders: {
    console: { type: 'stdout', layout: { type: 'colored' } },
    defaultFile: {
      type: 'dateFile',
      filename: 'logger.log',
      layout: { type: 'basic' },
      compress: true,
      numBackups: 4,
      keepFileExt: true
    }
  },
  categories: {
    default: { appenders: ['console', 'defaultFile'], level: process.env.LOG_LEVEL ?? 'error' }
  }
});

export default getLogger();
export const requestLogger = getLogger('request');
