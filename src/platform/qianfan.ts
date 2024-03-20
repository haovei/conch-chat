// 千帆接口
import { ChatCompletion, setEnvVariable } from '@baiducloud/qianfan';
import {
    QIANFAN_ACCESS_KEY,
    QIANFAN_API_MODEL,
    QIANFAN_SECRET_KEY,
    SYSTEM_PROMPTS,
} from '@/constant';
import type { ChatMessage, MessageType } from '@/type';

setEnvVariable('QIANFAN_ACCESS_KEY', QIANFAN_ACCESS_KEY);
setEnvVariable('QIANFAN_SECRET_KEY', QIANFAN_SECRET_KEY);
const client = new ChatCompletion();

function handleOutputMessage(chunk: any): MessageType {
    const msg = chunk?.result ?? '';
    return { content: msg };
}

async function chat(messages: ChatMessage[]) {
    const chatStream = await client.chat(
        {
            messages,
            stream: true,
            system: SYSTEM_PROMPTS,
        },
        QIANFAN_API_MODEL
    );

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
