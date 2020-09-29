module.exports = {
  devServer: {
    proxy: {
      "/api": "http://localhost:9000/api",
    }
  }
}
