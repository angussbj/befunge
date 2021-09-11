const path = require("path");
module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      ui: path.resolve(__dirname, "src/ui"),
      logic: path.resolve(__dirname, "src/logic"),
      utilities: path.resolve(__dirname, "src/utilities"),
    },
  };
  return config;
};
