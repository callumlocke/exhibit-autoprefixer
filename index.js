'use strict';

module.exports = function (options) {
  var autoprefixer = require('autoprefixer-core');
  var path = require('path');

  if (typeof options === 'string')
  	options = {browsers: [].slice.call(arguments)};

  var ap = autoprefixer(options);

  return function (file, triggerPaths, done) {
    try {
      file.text = ap.process(file.text, {
        from: path.join(this.sourceDir, file.path)
      }).css;
    }
    catch (err) {
      console.log('MESSAGE', err.message);

      done({
        message: err.message.split(' at line ' + err.line)[0],
        file: path.join(this.sourceDir, file.path),
        line: err.line,
        column: err.column,
        source: err.source
      });
      return;
    }

    done(null, file, []);
  };
};
