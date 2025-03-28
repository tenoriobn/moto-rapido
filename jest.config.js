module.exports = {
  testEnvironment: "jsdom", // Para testar código que interage com o DOM
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest", // Para transformar arquivos .js e .jsx
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)", // Não ignore axios
  ],
};
