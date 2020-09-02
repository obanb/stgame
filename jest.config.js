module.exports = {
    roots: ['<rootDir>/'],
    testMatch: ['**/__tests__/**/*.+(ts|tsx|js)', '**/?(*.)+(spec|test).+(ts|tsx|js)'],
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.(ts|tsx|js)'],
    transform: {
        '^.+\\.(js|ts|tsx)$': 'babel-jest',
    },

    coverageThreshold: {
        global: {
            branches: 30,
            functions: 30,
            lines: 30,
            statements: 30,
        },
    },
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    preset: 'ts-jest',
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.jest.json',
        },
    },
    testEnvironment: 'jsdom',
    coveragePathIgnorePatterns: ['<rootDir>/packages/(?:.+?)/lib/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx', 'node'],
};