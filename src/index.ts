import { Hono } from 'hono';
import { streamSSE } from 'hono/streaming';
import { etag } from 'hono/etag';
import { serveStatic } from 'hono/bun';
import { PORT } from '@/constant';
import platform from '@/platform';
const app = new Hono();

app.use(async (c, next) => {
    console.log(`${c.req.method} ${c.req.path}`);
    await next();
});

app.use('/*', etag({ weak: true }), serveStatic({ root: './public/' }));

app.post('/api/chat/completions', async (c) => {
    const { messages } = await c.req.json();
    let id = 0;

    try {
        const messageStream = await platform.chat(messages);

        return streamSSE(c, async (stream) => {
            for await (const message of messageStream) {
                const msg = message?.content ?? '';
                if (msg) {
                    await stream.writeSSE({
                        data: msg,
                        event: 'message',
                        id: String(id++),
                    });
                }
            }
            await stream.writeSSE({
                data: '[DONE]',
                event: 'message',
                id: String(id++),
            });
            stream.close();
        });
    } catch (e: any) {
        console.error(e);
        return c.json({ code: 500, error: e.message });
    }
});

export default {
    fetch: app.fetch,
    port: PORT,
};
