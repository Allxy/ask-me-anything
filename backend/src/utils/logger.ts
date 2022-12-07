import { getLogger } from 'log4js';

// configure({
//   appenders: {
//     console: { type: 'stdout', layout: { type: 'colored' } },
//     dateFile: {
//       type: 'dateFile',
//       filename: path.resolve(__dirname, `/${process.env.LOG_FILE ?? 'default.log'}`),
//       layout: { type: 'basic' },
//       compress: true,
//       numBackups: 14,
//       keepFileExt: true
//     }
//   },
//   categories: {
//     default: { appenders: ['console', 'dateFile'], level: process.env.LOG_LEVEL ?? 'error' }
//   }
// });

export const logger = getLogger();
