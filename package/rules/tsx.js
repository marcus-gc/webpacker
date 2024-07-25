const { resolve } = require('path')
const { realpathSync } = require('fs')
const { source_path: sourcePath, additional_paths: additionalPaths } = require('../config')
const { nodeEnv } = require('../env')

// Process application Javascript code with Babel.
// Uses application .babelrc to apply any transformations
module.exports = {
  test: /\.(ts|tsx)?(\.erb)?$/,
  include: [sourcePath, ...additionalPaths].map((p) => {
    try {
      return realpathSync(p)
    } catch (e) {
      return resolve(p)
    }
  }),
  exclude: /node_modules/,
  use: [
    {
      loader: 'esbuild-loader',
      options: {
        loader: 'tsx',
        minify: nodeEnv === 'production',
        target: 'es2015'
      }
    }
  ]
}
