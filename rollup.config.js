import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import sourceMaps from 'rollup-plugin-sourcemaps'
import camelCase from 'lodash.camelcase'
import typescript from 'rollup-plugin-typescript2'
import copy from 'rollup-plugin-copy-glob';
import json from 'rollup-plugin-json'

const pkg = require('./package.json')

const libraryName = 'prisma-pro-simulation'

export default {
  input: `src/index.ts`,
  output: [
    { file: pkg.main, name: camelCase(libraryName), format: 'umd', sourcemap: true },
    { file: pkg.module, format: 'es', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ["lodash","express-mock-server","glob", "lowdb", "lowdb/adapters/Memory"],
  watch: {
    include: 'src/**',
  },
  plugins: [
    // Allow json resolution
    json(),
    // Compile TypeScript files
    typescript({
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          module: "es2015",
          target: "es5",
        }
      }
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps(),

    copy([
      { files: 'src/**/prismaAPIMocks/*.json', dest: 'dist/lib' },
    ], { verbose: true, watch: false })
  ],
}
