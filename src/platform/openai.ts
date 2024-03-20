// OpenAI API
import OpenAI from 'openai';
import type { ChatMessage, MessageType } from '@/type';
import {
    OPENAI_API_KEY,
    OPENAI_API_MODEL,
    OPENAI_BASE_URL,
    OPENAI_ORG_ID,
    SYSTEM_PROMPTS,
} from '@/constant';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    baseURL: OPENAI_BASE_URL,
    organization: OPENAI_ORG_ID,
});

function handleOutputMessage(chunk: OpenAI.Chat.Completions.ChatCompletionChunk): MessageType {
    const msg = chunk.choices[0]?.delta?.content ?? '';
    return { content: msg };
}

async function chat(messages: ChatMessage[]) {
    const system: ChatMessage = {
        role: 'system',
        content: SYSTEM_PROMPTS,
    };
    const msgList = SYSTEM_PROMPTS ? [system, ...messages] : messages;

    const chatStream = await openai.chat.completions.create({
        messages: msgList,
        model: OPENAI_API_MODEL,
        stream: true,
    });

    const messageStream = async function* () {
        for await (const chunk of chatStream) {
            yield handleOutputMessage(chunk);
        }
    };

    return messageStream();
}

export default {
    chat,
};
