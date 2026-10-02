import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, FileText } from 'lucide-react';
import api from '../services/api';
import { getCurrentUser } from '../services/auth';
import { useToast } from '../components/Toast';

export default function ChatPage() {
    const { showToast } = useToast();
    const user = getCurrentUser();
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: `Hello${user?.full_name ? ' ' + user.full_name.split(' ')[0] : ''}! I am your docMantra AI assistant. Ask me anything about your uploaded documents — I'll answer using only those documents and cite the sources.`,
            sources: [],
        },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, loading]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || loading) return;

        const question = input.trim();
        const userMsg = { id: Date.now(), sender: 'user', text: question, sources: [] };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await api.post('/api/chat/', { question });
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    sender: 'ai',
                    text: response.data.answer,
                    sources: response.data.sources || [],
                },
            ]);
        } catch (err) {
            const msg = err.response?.data?.detail || 'Something went wrong';
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 2,
                    sender: 'ai',
                    text: `Sorry, I could not process that. ${msg}`,
                    sources: [],
                },
            ]);
            showToast('error', 'Chat error', msg);
        } finally {
            setLoading(false);
        }
    };

    const getInitials = () => {
        if (!user) return 'U';
        return (user.full_name || user.username || 'U')
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="max-w-[900px] mx-auto flex flex-col h-[calc(100vh-8rem)] animate-fade-up">
            {/* Header */}
            <div className="flex items-center gap-3.5 pb-4 border-b border-slate-200 mb-4">
                <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shrink-0"
                    style={{
                        background: 'linear-gradient(135deg, #1EC9B8, #007A6E)',
                        boxShadow: '0 4px 12px rgba(0, 180, 160, 0.3)',
                    }}
                >
                    <Bot className="w-5 h-5" />
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h2 className="text-[15px] font-bold text-navy-900">docMantra Assistant</h2>
                        <span className="badge badge-aqua">
                            <Sparkles className="w-2.5 h-2.5" /> Online
                        </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                        Ask questions across all your uploaded documents
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 py-2 pr-1">
                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={`flex gap-2.5 max-w-[92%] sm:max-w-[85%] ${m.sender === 'user' ? 'flex-row-reverse ml-auto' : ''}`}
                    >
                        <div
                            className={`w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 text-[11px] font-bold ${
                                m.sender === 'user'
                                    ? 'bg-navy-900 text-white'
                                    : 'text-white'
                            }`}
                            style={
                                m.sender === 'ai'
                                    ? { background: 'linear-gradient(135deg, #1EC9B8, #007A6E)' }
                                    : {}
                            }
                        >
                            {m.sender === 'user' ? getInitials() : <Bot className="w-4 h-4" />}
                        </div>

                        <div className={m.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                            <p className="whitespace-pre-wrap">{m.text}</p>

                            {m.sources && m.sources.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-slate-100">
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                                        Sources
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        {m.sources.map((s, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-50 text-[11px] text-slate-600 hover:bg-aqua-50 transition-colors cursor-pointer"
                                            >
                                                <FileText className="w-3 h-3 text-aqua-600 shrink-0" />
                                                <span className="truncate flex-1">{s.document_name || s.name}</span>
                                                <span className="text-slate-400 text-[10px] shrink-0">
                                                    {typeof s.relevance === 'number'
                                                        ? Math.round(s.relevance * 100) + '%'
                                                        : s.relevance}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {loading && (
                    <div className="flex gap-2.5">
                        <div
                            className="w-8 h-8 rounded-[10px] flex items-center justify-center shrink-0 text-white"
                            style={{ background: 'linear-gradient(135deg, #1EC9B8, #007A6E)' }}
                        >
                            <Bot className="w-4 h-4" />
                        </div>
                        <div className="chat-bubble-ai">
                            <div className="flex gap-1 py-1">
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                                <div className="typing-dot"></div>
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="pt-4 border-t border-slate-200">
                <div className="flex items-center gap-2.5 bg-white border-[1.5px] border-slate-200 rounded-2xl pl-5 pr-1.5 py-1.5 transition-all focus-within:border-aqua-500"
                     style={{ boxShadow: '0 0 0 0 transparent' }}>
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                        placeholder="Ask anything about your documents..."
                        className="flex-1 border-none outline-none text-sm text-slate-800 bg-transparent py-2"
                    />
                    <button
                        type="submit"
                        disabled={loading || !input.trim()}
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                        style={{ background: 'linear-gradient(135deg, #00B4A0, #007A6E)' }}
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-center text-[10px] text-slate-400 mt-2.5">
                    Answers are grounded in your uploaded documents with source references.
                </p>
            </form>
        </div>
    );
}