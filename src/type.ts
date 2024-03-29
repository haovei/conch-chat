import type { ChatCompletionMessageParam } from 'openai/resources/chat/completions.mjs';

export type ChatMessage = ChatCompletionMessageParam;

export type MessageType = {
    content: string;
};
