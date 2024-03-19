import { SYSTEM_PROMPTS } from '@/constant';
import type { ChatMessage } from '@/type';
import openai from './openai';

function withChat(fn: typeof openai.chat) {
    return async (messages: ChatMessage[]) => {
        const system: ChatMessage = {
            role: 'system',
            content: SYSTEM_PROMPTS,
        };
        const msg = SYSTEM_PROMPTS ? [system, ...messages] : messages;
        console.log('Chat messages:', msg);
        return fn(msg);
    };
}

const chat = withChat(openai.chat);

export default {
    chat,
};
