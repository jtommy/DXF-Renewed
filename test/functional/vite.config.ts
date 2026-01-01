import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 8030,
    fs: {
      // Allow importing DXF fixtures from test/resources and TS source from src/
      // while running Vite with root = test/functional.
      allow: [
        path.resolve(__dirname, '..'),
        path.resolve(__dirname, '..', '..'),
      ],
    },
  },
})
