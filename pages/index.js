import { useState } from "react";

export default function Home() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [streaming, setStreaming] = useState(false); // Fixed boolean type
    const [loading, setLoading] = useState(false);
    const [streamResponse, setStreamResponse] = useState("");

    const handleChat = async () => {
        setLoading(true);
        setResponse("");

        try {
            const res = await fetch('/api/chat', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            const data = await res.json();
            if (data.Error) throw new Error(data.Error);
            setResponse(data.response);
        } catch (error) {
            setResponse("Error: " + error.message);
        }

        setLoading(false);
    };

    const handleStreamChat = async () => {
        setStreaming(true);
        setStreamResponse("");

        try {
            const res = await fetch('/api/chat-stream', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ message })
            });

            if (!res.ok) throw new Error(res.statusText);

            const reader = res.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                const lines = chunk.split("\n");

                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        try {
                            const jsonStr = line.slice(6);
                            if (!jsonStr) continue;
                            const data = JSON.parse(jsonStr);
                            if (data.content) {
                                setStreamResponse((prev) => prev + data.content);
                            }
                        } catch (e) {
                            console.error("Error parsing JSON chunk", e);
                        }
                    }
                }
            }
        } catch (error) {
            setStreamResponse("Error: " + error.message);
        }

        setStreaming(false); // Fixed boolean type
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100 font-sans">
            {/* Header */}
            <header className="bg-indigo-600 text-white p-4 shadow-md">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    {/* Simple Icon */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                    Gemini Stream Chat
                </h1>
            </header>

            {/* Chat Area */}
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                <div className="max-w-3xl mx-auto space-y-6">
                    {/* Regular Chat Response */}
                    {response && (
                        <div className="flex flex-col space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase">Standard Response</span>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
                                <p className="text-gray-800 whitespace-pre-wrap">{response}</p>
                            </div>
                        </div>
                    )}

                    {/* Stream Chat Response */}
                    {streamResponse && (
                        <div className="flex flex-col space-y-1">
                            <span className="text-xs font-semibold text-gray-500 uppercase">Streaming Response</span>
                            <div className="bg-indigo-50 p-4 rounded-xl shadow-sm border border-indigo-100">
                                <p className="text-gray-800 whitespace-pre-wrap">{streamResponse}</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Message Input */}
            <footer className="bg-white p-4 border-t border-gray-200">
                <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3">
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask Gemini anything..."
                        className="text-black flex-1 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
                        disabled={loading || streaming}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleStreamChat();
                            }
                        }}
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={handleChat}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${loading || streaming ? 'bg-gray-300 cursor-not-allowed text-gray-500' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}`}
                            disabled={loading || streaming}
                        >
                            Standard
                        </button>
                        <button
                            onClick={handleStreamChat}
                            className={`px-4 py-2 rounded-lg font-medium text-white transition-colors flex items-center gap-2 ${loading || streaming ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
                            disabled={loading || streaming}
                        >
                            {streaming ? (
                                <>
                                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                    Streaming...
                                </>
                            ) : "Stream"}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    )
}