@echo off
@echo | set /p= 'use strict'; > ../public/env-config.js
@echo | set /p= Object.defineProperty(window, '_wemiEnv_', {>> ../public/env-config.js
@echo | set /p= value: undefined,>> ../public/env-config.js
@echo | set /p= writable: false,>> ../public/env-config.js
@echo | set /p= configurable: false,>> ../public/env-config.js
@echo | set /p= enumerable: false,>> ../public/env-config.js
@echo });>> ../public/env-config.js