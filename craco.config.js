module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.cache = { type: "filesystem" }; // 캐싱 활성화
      return webpackConfig;
    },
  },
};
