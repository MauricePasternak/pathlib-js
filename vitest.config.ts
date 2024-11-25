/// <reference types="vitest" />
import { defineConfig, UserConfig } from "vitest/config";

export default defineConfig({
	test: {
		globals: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: [
				"docs/**",
				"coverage/**",
				"dist/**",
				"**/node_modules/**",
				"**/*.d.ts",
				"**/*.test.ts",
				"**/*.config.ts",
				"src/index.ts",
				"src/types.ts",
			],
		},
	},
	esbuild: {
		target: "es2020",
		include: /\.(m?[jt]s|[jt]sx)$/,
	},
}) satisfies UserConfig;
