// Copyright 2015-present runtime.js project authors
// Copyright 2017-edited jsos project authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const shell = require('shelljs');
const path = require('path');
const fetch = require('./fetch');

module.exports = function(kernelVersion, shouldBeLocal, cb) {
  const basePath = shouldBeLocal ? __dirname : process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  const kernelsDir = path.resolve(basePath, '.jsos-kernel');
  if (!shell.test('-d', kernelsDir)) {
    shell.mkdir(kernelsDir);
  }

  const tmpName = `jsos.${kernelVersion}.download`;
  const tmpFile = path.resolve(kernelsDir, tmpName);
  const resultFile = path.resolve(kernelsDir, `jsos.${kernelVersion}`);

  if (shell.test('-f', resultFile)) {
    return cb(null, resultFile);
  }

  if (shell.test('-f', tmpFile)) {
    shell.rm('-f', tmpFile);
  }

  fetch(kernelVersion, shouldBeLocal, cb);
};
