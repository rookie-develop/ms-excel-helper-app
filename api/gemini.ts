import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const { prompt } = req.body;
    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    res.status(200).json({ output: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gemini API error" });
  }
}
