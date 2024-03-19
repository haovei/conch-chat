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
        const chatStream = await platform.chat(messages);

        return streamSSE(c, async (stream) => {
            for await (const chunk of chatStream) {
                const msg = chunk.choices[0]?.delta?.content ?? '';
                await stream.writeSSE({
                    data: msg,
                    event: 'message',
                    id: (id++).toString(),
                });
            }
            await stream.writeSSE({
                data: '',
                event: 'DONE',
                id: (id++).toString(),
            });
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
