module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest'

  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  setupFiles: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    '/node_modules/(?!axios)' // axiosをトランスパイル対象に含める
  ],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json',
      useESM: true // ESMサポートを有効にする
    }
  }
};