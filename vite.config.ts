import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const geminiApiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || ''

  return {
    plugins: [
      react(), 
      tailwindcss(),
      {
        name: 'local-api-chat',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.end(JSON.stringify({ error: 'Method Not Allowed' }))
              return
            }

            let body = ''
            req.on('data', (chunk) => { body += chunk })
            req.on('end', async () => {
              try {
                const { message, history } = JSON.parse(body || '{}')
                if (!geminiApiKey) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'GEMINI_API_KEY not found in server environment' }))
                  return
                }

                const GEMINI_API_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'
                const response = await fetch(`${GEMINI_API_ENDPOINT}?key=${geminiApiKey}`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    contents: [
                      ...(Array.isArray(history) ? history.slice(-4).map((msg: any) => ({
                        role: msg.role === 'user' ? 'user' : 'model',
                        parts: [{ text: String(msg.content) }]
                      })) : []),
                      { role: 'user', parts: [{ text: message }] }
                    ],
                    generationConfig: {
                      temperature: 0.5,
                      maxOutputTokens: 800
                    }
                  })
                })

                if (!response.ok) {
                  res.statusCode = response.status
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: 'Upstream Gemini error' }))
                  return
                }

                const data: any = await response.json()
                const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text || ''
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ reply: candidateText }))
              } catch (err: any) {
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ error: err.message || 'Server error' }))
              }
            })
          })
        }
      }
    ],
    optimizeDeps: {
      include: ['react', 'react-dom', 'lucide-react'],
    },
    server: {
      host: true,
      port: 5173,
      hmr: {
        overlay: true,
      },
    },
  }
})


