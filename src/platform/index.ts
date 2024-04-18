import { CURRENT_API } from '@/constant';
import type { ChatMessage } from '@/type';
import openai from './openai';
import qianfan from './qianfan';
import azure from './azure';
import ollama from './ollama';

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
        case 'AZURE':
            return azure;
        case 'OLLAMA':
            return ollama;
        default:
            return openai;
    }
}

export default {
    chat: withChat(generatePlatform(CURRENT_API).chat),
};
