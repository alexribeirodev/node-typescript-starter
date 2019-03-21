const { src, dest, series } = require("gulp");

function copyPackageJson() {
  return src('package.json')
    .pipe(dest('dist/'))
}

function copyDocDefinitionsYmal(){
  return src('doc_definitions.yaml')
    .pipe(dest('dist/'))
}

exports.build = series(copyPackageJson, copyDocDefinitionsYmal);
