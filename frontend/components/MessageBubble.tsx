"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Props = {
    role: string;
    content: string;
};

export default function MessageBubble({
    role,
    content
}: Props) {

    return (
        <div
            style={{
                marginBottom: 16,
                padding: 12,
                borderRadius: 8,
                background:
                    role === "user"
                    ? "#e5e7eb"
                    : "f3f4f6"
            }}
        >
            
            <strong>
                {role === "user"
                    ? "You"
                    : "Assistant"}
            </strong>
            
            <div style={{ marginTop: 8 }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content}
                </ReactMarkdown>
            </div>
        </div>
    );
}