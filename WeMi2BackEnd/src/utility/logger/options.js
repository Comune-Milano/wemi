import path from 'path';
import fs from 'fs';
import { TRACE, ERROR, INFO } from '../../constants/constantslog';
import { __PRODUCTION__ } from 'environment';


/***
 * Logger options
 */
export const levelLog = INFO;
/**
 * @param {string} logPath
 * @param logFilename
 * @param subDirPath
 */
const calcolaLogPath = (logFilename, subDirPath = 'logs') => {
  const subDirFullPath = path.join(__dirname, subDirPath);
  const subDirExists = fs.existsSync(subDirFullPath);
  if (!subDirExists) {
    fs.mkdirSync(subDirFullPath, { recursive: true });
  }
  const pathName = path.join(subDirFullPath, logFilename);
  return pathName;
};

const loggingStreams = [
  {
    level: ERROR,
    stream: process.stdout,
  },
  // {
  //   level: INFO,
  //   path: calcolaLogPath('wemi2-info.log'),
  //   type: 'rotating-file',
  //   period: '1d', // daily rotation
  //   count: 7, // keep 3 back copies
  // },
  {
    level: TRACE,
    path: calcolaLogPath('wemi2-trace.log'),
    type: 'rotating-file',
    period: '1d', // daily rotation
    count: 7, // keep 3 back copies
  },
];

export const options = {
  name: 'wemi2-backendapp',
  level: levelLog,
  reemitErrorEvents: true,
  streams: loggingStreams,
};