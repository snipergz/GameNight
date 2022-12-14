module.exports = function override(config, env) {
    console.log("React app rewired works!")
    config.resolve.fallback = {
      path: false,
      os: false,
      fs: false
    };
    return config;
  };