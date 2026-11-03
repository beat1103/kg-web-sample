import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Next.js 기본 규칙
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // 무시할 경로
  {
    ignores: [
      ".next/**", // 빌드 산출물 제외
      "next-env.d.ts", // 빌드 산출물 제외
      "node_modules/**", // 패키지 제외
      "app/(pages)/template/**", // 기존 무시 경로
      "components/template/**",
    ],
  },

  // 커스텀 규칙
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
