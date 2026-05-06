"use client";

import { useState } from "react";
import { sendMessage } from "../lib/api";

export default function Chat() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = `You: ${input}`;
        setMessages((prev) => [...prev, userMsg]);

        const res = await sendMessage(input);
        const botMsg = `MinistryPal: ${res.response}`;

        setMessages((prev) => [...prev, botMsg]);
        setInput("");
    }

    return (
        <div style={{ padding: 20}}>
            <div style={{minHeight: 300}}>
                {messages.map((msg, idx) => (
                    <p key={idx}>{msg}</p>
                ))}
            </div>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                }}
                placeholder="Type your message..."
                style={{ width: "80%", padding: 10, marginRight: 10 }}
            />
            <button onClick={handleSend} style={{ padding: "10px 20px" }}>Send</button>
        </div>
    );
}