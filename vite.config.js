import { defineConfig } from 'vite'

export default defineConfig({
  // Base public path when served in development or production
  base: './',
  
  // Build options
  build: {
    // Output directory for build files
    outDir: 'dist',
    
    // Generate source maps for debugging
    sourcemap: false,
    
    // Minify the output
    minify: true,
    
    // Assets will be inlined as base64 URLs if smaller than this limit
    assetsInlineLimit: 4096,
    
    // Rollup options
    rollupOptions: {
      output: {
        // Customize asset file names
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js'
      }
    }
  },
  
  // Server options for development
  server: {
    port: 3000,
    open: true
  },
  
  // Preview server options
  preview: {
    port: 4173,
    open: true
  }
})