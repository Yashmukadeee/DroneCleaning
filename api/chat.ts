import { SYSTEM_PROMPT } from '../src/data/chatbotKnowledge';

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export default async function handler(req: any, res: any) {
  if (req.method === 'OPTIONS') {
    return res.status(200).json({ ok: true });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server API key not configured' });
  }

  try {
    const { message, history } = req.body || {};
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' });
    }

    const conversationContents = [
      {
        role: 'user',
        parts: [{ text: `${SYSTEM_PROMPT}\n\nIMPORTANT: Strict domain boundary applies. Answer the user's inquiry strictly about DroneCleaning.Tech.` }]
      },
      {
        role: 'model',
        parts: [{ text: `Understood. I am AeroBot, strictly dedicated to answering questions about DroneCleaning.Tech, facade robotics, pure water chemistry, tether engineering, and creator Yash Mukade.` }]
      },
      ...(Array.isArray(history) ? history.slice(-4).map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(msg.content) }]
      })) : []),
      {
        role: 'user',
        parts: [{ text: message }]
      }
    ];

    const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: conversationContents,
        generationConfig: {
          temperature: 0.5,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 800
        }
      })
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Upstream AI provider error' });
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return res.status(200).json({ reply: candidateText || '' });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
