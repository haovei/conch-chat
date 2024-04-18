// Ollama API
import ollama from 'ollama';
import type { ChatMessage, MessageType } from '@/type';
import { OLLAMA_API_MODEL, SYSTEM_PROMPTS } from '@/constant';

function handleOutputMessage(chunk): MessageType {
    const msg = chunk.message.content ?? '';
    return { content: msg };
}

async function chat(messages: ChatMessage[]) {
    const system: ChatMessage = {
        role: 'system',
        content: SYSTEM_PROMPTS,
    };
    const msgList = SYSTEM_PROMPTS ? [system, ...messages] : messages;

    const chatStream = await ollama.chat({
        messages: msgList,
        model: OLLAMA_API_MODEL,
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
