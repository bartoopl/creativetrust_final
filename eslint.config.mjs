import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// eslint-config-next 16 ships flat configs; `next lint` is gone, run `eslint .`.
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    rules: {
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    // CommonJS on purpose: preloaded with `node -r` in the Docker image.
    files: ["**/*.cjs"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "media/**",
    "blender/**",
    "design_handoff_medusa_redesign/**",
    "next-env.d.ts",
    "src/app/(payload)/**",
    "src/payload-types.ts",
    "src/migrations/**",
  ]),
]);
