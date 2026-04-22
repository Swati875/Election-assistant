import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy_key");
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash",
  systemInstruction: "You are a helpful and knowledgeable Election Assistant. Your purpose is to guide citizens through the election process, including polling station information, voting procedures, legal limitations, and proper etiquette. Answer questions clearly and concisely. If a user asks about topics completely unrelated to elections or voting, politely decline to answer and steer the conversation back to election-related topics."
});

// API Route for chat
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate response" });
  }
});

// Serve static files
app.use(express.static("dist"));

// Handle SPA routing
app.use((req, res) => {
    res.sendFile(path.resolve("dist/index.html"));
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});