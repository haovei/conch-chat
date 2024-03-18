import { SYSTEM_PROMPTS } from '@/constant';
import type { ChatMessage } from '@/type';
import openai from './openai';

function withChat(fn: typeof openai.chat) {
    return async (messages: ChatMessage[]) => {
        console.log('Chat messages:', messages);
        const system: ChatMessage = {
            role: 'system',
            content: SYSTEM_PROMPTS,
        };
        const msg = SYSTEM_PROMPTS ? [system, ...messages] : messages;
        return fn(msg);
    };
}

const chat = withChat(openai.chat);

export default {
    chat,
};
