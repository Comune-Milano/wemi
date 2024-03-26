import fs from "fs";
import path from "path";
import { promisify } from "util";
import { ApolloError } from "apollo-server";
import { logger } from "./logger/getInstance";
import {
  WRONG_BASE64_FORMAT_ERROR,
  OVERRIDE_FILE_ERROR,
  FAILED_TO_SAVE_BASE64_FILE_ERROR
} from "errors/files";

// Some fs functions promisified.
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

/**
 * Generates a phisycal file from a base64 string and
 * saves it in the file system.
 */
export const saveFileFromBase64 = (filePath, fileName, base64, shouldOverride) => {
  const pathToWrite = path.join(filePath, fileName);
  const fileExists = fs.existsSync(pathToWrite);
  // If a file with the same path and name already exists,
  // we avoid to override it unless forced.
  if (fileExists && !shouldOverride) {
    throw new ApolloError(
      OVERRIDE_FILE_ERROR.message,
      OVERRIDE_FILE_ERROR.code
    );
  } 

  const dirExists = fs.existsSync(filePath);
  const createDirPromise = dirExists ? Promise.resolve() : mkdir(filePath);

  const [fileExtension, fileURI] = base64.split(';base64,');
  // Either the file extension or the uri is missing,
  // let's throw an error.
  if (!fileExtension || !fileURI) {
    logger.error(
      { filePath, fileName, base64 },
      'Error: base64 file saving failed since the input format is wrong.'
    );

    throw new ApolloError(
      WRONG_BASE64_FORMAT_ERROR.message,
      WRONG_BASE64_FORMAT_ERROR.code
    );
  }

  // Converts the base64 into a Buffer and create the pyshical file.
  const fileBuffer = Buffer.from(fileURI, "base64");

  return createDirPromise
    .then(() => writeFile(pathToWrite, fileBuffer))
    .catch(error => {
      logger.error(
        { error, filePath, fileName, base64 },
        'Error: base64 file saving failed unexpectedly.'
      );

      throw new ApolloError(
        FAILED_TO_SAVE_BASE64_FILE_ERROR.message,
        FAILED_TO_SAVE_BASE64_FILE_ERROR.code
      );
    });
}
