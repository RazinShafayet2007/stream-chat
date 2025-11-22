import { GoogleGenAI } from "@google/genai";

// Initialize Gemini with your API key
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { message } = req.body;

            // Use 'gemini-1.5-flash' for a balance of speed and cost (similar to gpt-3.5)
            const result = await genAI.models.generateContent({ model: "gemini-2.5-pro", contents: message });
            const text = result.text;

            res.status(200).json({
                response: text
            });

        } catch(error) {
            console.error("Gemini API Error:", error);
            res.status(500).json({
                Error: "Failed to process request: " + error.message
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}