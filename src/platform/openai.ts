// OpenAI API
import OpenAI from 'openai';
import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';
import { OPENAI_API_KEY, OPENAI_API_MODEL, OPENAI_BASE_URL, OPENAI_ORG_ID } from '@/constant';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: OPENAI_BASE_URL,
    organization: OPENAI_ORG_ID,
});

async function chat(messages: ChatCompletionMessageParam[]) {
    const stream = await openai.chat.completions.create({
        messages,
        model: OPENAI_API_MODEL,
        stream: true,
    });

    return stream;
}

export default {
    chat,
};
