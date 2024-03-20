import { CURRENT_API, SYSTEM_PROMPTS } from '@/constant';
import type { ChatMessage } from '@/type';
import openai from './openai';
import qianfan from './qianfan';

function withChat(fn: typeof openai.chat) {
    return async (messages: ChatMessage[]) => {
        console.log(`[${CURRENT_API}]`, 'Chat messages:', messages);
        return fn(messages);
    };
}

function generatePlatform(platform: string) {
    switch (platform) {
        case 'OPENAI':
            return openai;
        case 'QIANFAN':
            return qianfan;
        default:
            return openai;
    }
}

export default {
    chat: withChat(generatePlatform(CURRENT_API).chat),
};
