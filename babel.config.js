module.exports = function (api) {
  api.cache(false);
  return {
    plugins: [
      [
        "module-resolver",
        {
          root: ["."],
          alias: {
            utilities: "./src/utilities",
          },
        },
      ],
    ],
  };
};
