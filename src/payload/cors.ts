export const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) {
      callback(null, true)
      return
    }

    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://your-app.vercel.app',
      'https://www.your-domain.com',
      process.env.NEXT_PUBLIC_SERVER_URL,
    ].filter(Boolean)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
  exposedHeaders: ['x-csrf-token'],
}