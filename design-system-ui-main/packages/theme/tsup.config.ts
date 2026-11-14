import { defineConfig } from 'tsup';

export default defineConfig([
  // ── Root entry (core tokens, no React/AntD) ──
  {
    entry: { index: 'src/index.ts' },
    format: ['esm'],
    dts: true,
    clean: true,
    outDir: 'dist',
    sourcemap: true,
    platform: 'neutral',
    external: ['react', 'react-dom', 'antd'],
  },
  // ── AntD adapter sub-entry ──
  {
    entry: { index: 'src/antd/index.ts' },
    format: ['esm'],
    dts: true,
    clean: false,
    outDir: 'dist/antd',
    sourcemap: true,
    platform: 'neutral',
    external: ['react', 'react-dom', 'antd', '@ant-design/icons'],
    // antd adapter depends on core tokens → bundle them inline
    noExternal: [/^\.\.\/tokens\//],
  },
  // ── Token generation script ──
  {
    entry: { generate: 'src/tokens/generate.ts' },
    format: ['esm'],
    dts: false,
    clean: false,
    outDir: 'scripts',
    sourcemap: false,
    platform: 'node',
    external: [],
  },
]);
