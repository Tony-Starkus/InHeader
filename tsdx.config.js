// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
// const svg = require('rollup-plugin-svg');
const svgr = require('@svgr/rollup').default;
const url = require('@rollup/plugin-url');
const image = require('@rollup/plugin-image');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.plugins.push(url(), svgr(), image());
    return config; // always return a config.
  },
};
