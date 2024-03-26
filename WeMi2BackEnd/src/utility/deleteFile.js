import fs from "fs";
import path from "path";
import { promisify } from "util";
import { ApolloError } from "apollo-server";
import { logger } from "./logger/getInstance";
import { FAILED_TO_DELETE_FILE_ERROR } from "errors/files";

// Some fs functions promisified.
const unlink = promisify(fs.unlink);

/**
 * Delete file
 */
export const deleteFile = (filePath, fileName) => {
  const pathToDelete = path.join(filePath, fileName);
  const fileExists = fs.existsSync(pathToDelete);
  const deleteFilePromise = fileExists ? unlink(pathToDelete) : Promise.resolve();

  return deleteFilePromise
    .catch(error => {
      logger.error(
        error,
        'Error: delete file failed unexpectedly.',
      );

      throw new ApolloError(
        FAILED_TO_DELETE_FILE_ERROR.message,
        FAILED_TO_DELETE_FILE_ERROR.code
      );
    });
}
