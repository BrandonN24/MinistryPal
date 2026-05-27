export async function sendMessage(message: string) {
    const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message })
    });

    return res.json();
}

export async function streamMessage(
    message: string,
    onChunk: (chunk: string) => void
) {

    const response = await fetch("http://localhost:8000/chat/stream",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        }
    );

    if (!response.body) return;

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value);
        onChunk(chunk);
    }
}