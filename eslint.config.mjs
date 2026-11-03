import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "app/(pages)/template/**",
      "components/template/**",
    ],
    ...compat.extends("next/core-web-vitals", "next/typescript"),
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ], // 사용하지 않는 변수 경고
      "@typescript-eslint/no-explicit-any": "off",                  // any 타입 사용 허용
      'react/no-unescaped-entities': 'off',                         // html unescape 문자 사용 허용
      // 'react-hooks/exhaustive-deps': 'warn',                     // useEffect 의존성 배열 경고
      // '@next/next/no-img-element': 'warn',                       // img 태그 사용 경고
      // '@typescript-eslint/no-unused-vars-experimental': 'warn',  // 실험적 변수 사용 경고
      // '@typescript-eslint/no-unused-vars-ignore': 'warn',        // 무시된 변수 사용 경고
      // '@typescript-eslint/no-unused-vars-jsdoc': 'warn',         // JSDoc에서 사용하지 않는 변수 경고
    },
  },
];

export default eslintConfig;
