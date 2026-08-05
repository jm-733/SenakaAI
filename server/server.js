import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

const client = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1"
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        const completion = await client.chat.completions.create({

            model: "mistralai/mistral-7b-instruct:free",

            messages: [
                {
                    role: "system",
                    content:
                        "You are Senaka, a friendly, intelligent AI assistant. Keep your answers helpful, natural, and concise."
                },
                {
                    role: "user",
                    content: message
                }
            ]

        });

        res.json({
            reply: completion.choices[0].message.content
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            reply: "Sorry, I couldn't connect to the AI."
        });

    }

});

app.listen(PORT, () => {
    console.log(`✅ Senaka AI is running on port ${PORT}`);
});
