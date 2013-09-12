'use strict';

var path = require('path');
var _ = require('lodash');

module.exports = function(grunt) {
  grunt.registerMultiTask('pathrev', 'Rev file path in files', function() {
    var options = this.options();

    this.files.forEach(function (el) {
      el.src.forEach(function (file) {
        var extname = path.extname(file).replace(/^\./, '');
        var match;
        var contents;

        // if no ext match
        if (!(extname in options.matches)) { return; }

        contents = grunt.file.read(file);
        match = options.matches[extname];

        // rewrite as global regex if string
        if (_.isString(match.src)) {
          match.src = new RegExp(match.src, 'g');
        }

        contents = contents.replace(match.src, match.dest);
        grunt.file.write(file, contents);
        grunt.log.writeln('✔ '.green + file);
      });
    });
  });
};
