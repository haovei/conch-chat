import { useCallback, useState } from 'react';
import Markdown from 'react-markdown';
import { fetchEventSource } from '@fortaine/fetch-event-source';

export default function App() {
    const [markdown, setMarkdown] = useState('');
    const [inputText, setInputText] = useState('');

    const sendMessage = useCallback((message: string) => {
        let remainText = '';

        const renderText = () => {
            setMarkdown(remainText);
        };

        fetchEventSource('/api/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                messages: [{ role: 'user', content: message }],
            }),
            async onopen(response) {
                console.log('open', response);
            },
            async onmessage(msg) {
                console.log('message', msg);
                if (msg.event === 'DONE') {
                    renderText();
                    console.log('Done');
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
            },
            onerror(err) {
                console.log('error', err);
            },
        });
    }, []);

    const handleSend = useCallback(() => {
        sendMessage(inputText);
    }, [sendMessage, inputText]);

    return (
        <div>
            <div>
                <input
                    onChange={(e) => {
                        setInputText(e.target.value);
                    }}
                />
                <button type="button" onClick={handleSend}>
                    发送
                </button>
            </div>
            <hr />
            <div className="markdown-body">
                <Markdown>{markdown}</Markdown>
            </div>
        </div>
    );
}
