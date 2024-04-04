module.exports = {
  webpack: (config,isServer) => {
    config.resolve.alias.canvas = false;
    config.experiments = { ...config.experiments,  topLevelAwait: true };
   
    return config;
  },
  reactStrictMode: false
};
