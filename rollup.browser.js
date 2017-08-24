import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
var pkg = require('./package.json')

export default {
  entry: 'src/y-xml.js',
  moduleName: 'yXml',
  format: 'umd',
  plugins: [
    nodeResolve({
      main: true,
      module: true,
      browser: true
    }),
    commonjs(),
    babel(),
    uglify({
      output: {
        comments: function (node, comment) {
          var text = comment.value
          var type = comment.type
          if (type === 'comment2') {
            // multiline comment
            return /@license/i.test(text)
          }
        }
      }
    })
  ],
  dest: 'y-xml.js',
  sourceMap: true,
  banner: `
/**
 * ${pkg.name} - ${pkg.description}
 * @version v${pkg.version}
 * @license ${pkg.license}
 */
`
}
