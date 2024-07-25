module.exports = {
  // Визначаєте, які файли потрібно трансформувати за допомогою babel-jest
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  // Ігнорує трансформацію для бібліотек в node_modules
  transformIgnorePatterns: ['/node_modules/'],
  // Додаткові розширення файлів, які Jest буде обробляти
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  // Вказує, що Jest слід шукати тести в цій директорії
  roots: ['<rootDir>/src'],
  // Налаштування для покриття коду
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}'],
  coverageDirectory: 'coverage',
  // Можливість використовувати Jest з іншими типами модулів
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
  },
  // Конфігурація для таймерів
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  // Якщо ви використовуєте TypeScript
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },
  // Налаштування для обробки помилок
  verbose: true,
};
