const MODULE_RESOLVER = [
  'module-resolver',
  {
    extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
    alias: {
      '@lm': "./src",
    }
  },
];

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    MODULE_RESOLVER,
    ["module:react-native-dotenv"]
  ],
};
