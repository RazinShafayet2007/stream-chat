import { GoogleGenAI } from "@google/genai";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { message } = req.body;
            const result = await genAI.models.generateContentStream({ model: "gemini-2.5-flash", contents: message });

            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache, no-transform');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('X-Accel-Buffering', 'no'); // Disable buffering for Vercel

            for await (const chunk of result) {
                const chunkText = chunk.text;
                if (chunkText) {
                    const formattedData = `data: ${JSON.stringify({ content: chunkText })}\n\n`;
                    res.write(formattedData);
                }
            }
            res.end();

        } catch(error) {
            console.error("Stream Error:", error);
            res.status(500).json({
                Error: "Failed to process request"
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}