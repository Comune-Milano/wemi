
const validateOptions = require('schema-utils');
const fs = require('fs');
const path = require('path');
const promisify = require("util").promisify;

// Some fs functions promisified.
const mkdir = promisify(fs.mkdir);

// Validation schema.
const schema = {
  type: 'array'
};

class MakeDirsPlugin {
  constructor(options) {
    validateOptions(schema, options, 'Make Dirs Plugin');
    this.dirs = options;
  }

  apply(compiler) {
    compiler.hooks.done.tapAsync('Make Dirs Plugin', (stats, doneCallback) => {
      const outputPath = stats.compilation.options.output.path;

      const dirsPromises = this.dirs.map(relPath => {
        const absPath = path.join(outputPath, relPath);
        return mkdir(absPath, { recursive: true });
      });

      Promise.all(dirsPromises).then(() => doneCallback());
    });
  }
}

module.exports = MakeDirsPlugin;
