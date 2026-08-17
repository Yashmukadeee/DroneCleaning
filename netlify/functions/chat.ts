import type { Handler } from '@netlify/functions';
import { SYSTEM_PROMPT } from '../../src/data/chatbotKnowledge';

const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// Server-side IP rate limiting map
const ipRequestLogs = new Map<string, number[]>();
const MAX_PER_MINUTE = 6;
const MAX_PER_HOUR = 30;

export const handler: Handler = async (event) => {
  // CORS Headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: JSON.stringify({ message: 'OK' }) };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const clientIP = event.headers['client-ip'] || event.headers['x-forwarded-for'] || 'anonymous';
  const now = Date.now();

  // Server-side IP Rate Limiting
  const timestamps = (ipRequestLogs.get(clientIP) || []).filter((t) => now - t < 60 * 60 * 1000);
  const inLastMinute = timestamps.filter((t) => now - t < 60 * 1000).length;

  if (inLastMinute >= MAX_PER_MINUTE) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: 'Rate limit exceeded. Please wait a moment.' })
    };
  }

  if (timestamps.length >= MAX_PER_HOUR) {
    return {
      statusCode: 429,
      headers,
      body: JSON.stringify({ error: 'Hourly rate limit exceeded.' })
    };
  }

  timestamps.push(now);
  ipRequestLogs.set(clientIP, timestamps);

  // Read API Key strictly from server environment (never sent to client)
  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server API key not configured' })
    };
  }

  try {
    const { message, history } = JSON.parse(event.body || '{}');

    if (!message || typeof message !== 'string') {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid message' })
      };
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
      const errorText = await response.text();
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ error: 'Upstream AI provider error', details: errorText })
      };
    }

    const data = await response.json();
    const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ reply: candidateText || '' })
    };
  } catch (err: any) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Internal Server Error' })
    };
  }
};
