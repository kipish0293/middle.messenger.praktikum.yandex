import type { Config } from "jest";

const config: Config = {
    verbose: true,
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    testMatch: [
        "**/src/**/?(*.)(spec|test).ts"
    ],
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$", "^.+\\.module\\.(css|sass|scss)$"],
    moduleFileExtensions: ["web.js", "js", "web.ts", "ts", "web.tsx", "tsx", "json", "web.jsx", "jsx", "node"],
};

export default config;
