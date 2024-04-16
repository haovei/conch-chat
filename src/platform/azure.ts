// Azure API
import { OpenAIClient, AzureKeyCredential, type ChatCompletions } from '@azure/openai';
import type { ChatMessage, MessageType } from '@/type';
import { AZURE_API_KEY, AZURE_API_MODEL, AZURE_BASE_URL, SYSTEM_PROMPTS } from '@/constant';

const client = new OpenAIClient(AZURE_BASE_URL, new AzureKeyCredential(AZURE_API_KEY));

function handleOutputMessage(chunk: ChatCompletions): MessageType {
    const msg = chunk.choices[0]?.delta?.content ?? '';
    return { content: msg };
}

async function chat(messages: ChatMessage[]) {
    const system: ChatMessage = {
        role: 'system',
        content: SYSTEM_PROMPTS,
    };
    const msgList = SYSTEM_PROMPTS ? [system, ...messages] : messages;

    const chatStream = await client.streamChatCompletions(AZURE_API_MODEL, msgList);

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
