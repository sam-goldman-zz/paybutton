module.exports = {
  resolve: {
    fallback: { 
      "assert": require.resolve("assert/"),
      "stream": require.resolve("stream-browserify"),
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http")
    }
  }
};