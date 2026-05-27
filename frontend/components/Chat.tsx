"use client";

import { useState } from "react";
import { streamMessage } from "../lib/api";

type Message = {
    role: string;
    content: string;
};

export default function Chat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input || loading) return;

        setLoading(true);

        const userMsg = { role: "user", content: input };
        setMessages((prev) => [...prev, userMsg]);

        let assistantText = "";

        setMessages(prev => [
            ...prev,
            {
                role: "assistant",
                content: ""
            }
        ]);

        await streamMessage(
            input,
            (chunk) => {
                assistantText += chunk;

                setMessages(prev => {
                    const updated = [...prev];

                    updated[
                        updated.length - 1
                    ] = {
                        role: "assistant",
                        content: assistantText
                    };
                    
                    return updated;
                });
            }
        );

        setInput("");
        setLoading(false);

    };

    return (
        <div style={{ padding: 24 }}>

        <h1>Chat Log</h1>

        <div
            style={{
            minHeight: 300,
            marginBottom: 20
            }}
        >
            {messages.map((msg, i) => (
            <p key={i}>
                <strong>
                {msg.role}:
                </strong>{" "}
                {msg.content}
            </p>
            ))}
        </div>

        <input
            value={input}
            onChange={(e) =>
            setInput(e.target.value)
            }
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSend();
                }
            }}
        />

        <button
            onClick={handleSend}
            disabled={loading}
        >
            {loading
            ? "Streaming..."
            : "Send"}
        </button>

        </div>
    );
}