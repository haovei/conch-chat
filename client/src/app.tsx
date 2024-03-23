import { useCallback, useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import { fetchEventSource } from '@fortaine/fetch-event-source';

export default function App() {
    const [isReceiving, setIsReceiving] = useState(false);
    const [messageList, setMessageList] = useState<any[]>([]);
    const [markdown, setMarkdown] = useState('');
    const [inputText, setInputText] = useState('');

    const sendMessage = useCallback(() => {
        let remainText = '';

        const renderText = () => {
            setMarkdown(remainText);
        };

        const messageDone = () => {
            setMessageList((list) => [...list, { role: 'assistant', content: remainText }]);
            setIsReceiving(false);
            setMarkdown('');
        };

        fetchEventSource('api/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [...messageList],
            }),
            async onopen(response) {
                console.log('open', response);
            },
            async onmessage(msg) {
                console.log('message', msg);
                if (msg.event === 'DONE') {
                    renderText();
                    console.log('Done');
                    messageDone();
                    return;
                }
                const text = msg.data;
                try {
                    if (text) {
                        remainText += text;
                    }
                    renderText();
                } catch (e) {
                    console.error('[Request] parse error', e);
                }
            },
            onclose() {
                console.log('close');
                renderText();
                messageDone();
            },
            onerror(err) {
                console.log('error', err);
            },
        });
    }, [messageList]);

    useEffect(() => {
        if (isReceiving) {
            sendMessage();
        }
    }, [isReceiving, sendMessage]);

    const handleSend = useCallback(() => {
        if (!inputText) {
            return;
        }
        setInputText('');
        setMarkdown('');
        setMessageList([...messageList, { role: 'user', content: inputText }]);
        setIsReceiving(true);
    }, [inputText, messageList]);

    return (
        <div className="bg-white flex flex-col h-full">
            <div className="flex-1">
                {messageList.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex m-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                        <div
                            className={`p-4 rounded-lg bg-gray-100 ${
                                msg.role === 'user'
                                    ? 'rounded-tr-none ml-10'
                                    : 'rounded-tl-none mr-10'
                            }`}
                        >
                            <Markdown>{msg.content}</Markdown>
                        </div>
                    </div>
                ))}
                {isReceiving && markdown && (
                    <div className="flex m-4">
                        <div className="p-4 rounded-lg rounded-tl-none mr-10 bg-gray-100">
                            <Markdown>{markdown}</Markdown>
                            <div className="text-gray-400 text-sm">Thinking...</div>
                        </div>
                    </div>
                )}
            </div>
            <div className="h-13 p-3 bg-gray-100 flex">
                <div className="flex-1">
                    <input
                        onChange={(e) => {
                            setInputText(e.target.value);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                handleSend();
                            }
                        }}
                        value={inputText}
                        className="w-full h-full p-2"
                    />
                </div>
                <div>
                    <button
                        type="button"
                        onClick={handleSend}
                        disabled={isReceiving}
                        className="h-full px-4 bg-blue-500 text-white"
                    >
                        发送
                    </button>
                </div>
            </div>
        </div>
    );
}
