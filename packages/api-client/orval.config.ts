import { defineConfig } from '@orval/core';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:8787/health', // Will use Hono OpenAPI when available
      // For now, manually specify the API spec
      // Once Hono has OpenAPI generation, update this to the actual OpenAPI endpoint
    },
    output: {
      target: './src/generated',
      schemas: './src/generated/types',
      client: 'react-query',
      mode: 'tags-split',
      prettier: true,
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
});
