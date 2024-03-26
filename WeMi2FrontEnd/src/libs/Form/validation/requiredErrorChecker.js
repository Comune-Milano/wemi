import { REQUIRED_ERROR } from "./constants";

export function isRequiredErrorType(error) {
  return error === REQUIRED_ERROR;
}