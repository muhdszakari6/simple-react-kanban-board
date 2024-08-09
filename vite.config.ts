import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join, resolve } from 'path'
import dts from 'vite-plugin-dts'
import { externalizeDeps } from 'vite-plugin-externalize-deps'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts(),
    externalizeDeps({
      deps: false,
      devDeps: false,
      except: [],
      nodeBuiltins: true,
      optionalDeps: true,
      peerDeps: true,
      useFile: join(process.cwd(), 'package.json'),
    })
  ],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'SimpleReactKanbanBoard',
      // the proper extensions will be added
      fileName: 'simple-react-kanban-board',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'react-dom'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
      },
    },
  }
  ,
})
