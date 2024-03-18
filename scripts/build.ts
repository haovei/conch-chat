// Purpose: Build the platform code using Bun.
await Bun.build({
    entrypoints: ['./src/index.ts'],
    outdir: './dist',
    target: 'bun',
    external: ['hono'],
});
