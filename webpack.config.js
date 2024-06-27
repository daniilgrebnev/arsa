const path = require("path")

module.exports = {
  // Ваши текущие настройки Webpack
  entry: "./src/index.tsx", // пример входного файла
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".json", "ts", "tsx"], // расширения файлов, которые Webpack будет обрабатывать
  },
  module: {
    rules: [
      // Ваши правила для загрузчиков
    ],
  },
  plugins: [
    // Ваши плагины
  ],
}
