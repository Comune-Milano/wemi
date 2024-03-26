
import express from "express";
import path from 'path';
import { __PRODUCTION__, STORAGE_BOUND_PATH } from "environment";

// Expose public files.
// NOTE: In production env we do not need to serve static 
// files since an external volume is used.
const staticFiles = (req, res, next) => {
  if (__PRODUCTION__) {
    return next();
  }
  return express.static(path.join(__dirname, STORAGE_BOUND_PATH))(req, res, next);
};

export { staticFiles };