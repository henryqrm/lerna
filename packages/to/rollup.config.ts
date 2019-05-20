import rollupConfigBase from '../../rollup.config'

const pkg = require('./package.json')

const libraryName = 'to'

export default {
  ...rollupConfigBase(pkg, libraryName),
}
