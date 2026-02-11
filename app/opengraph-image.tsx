import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'GameVault - My Game Library'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0e14 0%, #1a1f2e 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 140,
            height: 140,
            borderRadius: 32,
            background: 'rgba(139, 92, 246, 0.1)',
            border: '4px solid rgba(139, 92, 246, 0.3)',
            marginBottom: 40,
          }}
        >
          <svg
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8h-1V6a2 2 0 00-2-2H9a2 2 0 00-2 2v2H6a2 2 0 00-2 2v6c0 1.1.9 2 2 2h12a2 2 0 002-2v-6a2 2 0 00-2-2z" />
            <circle cx="16" cy="13" r="1" fill="#8b5cf6" />
            <circle cx="16" cy="16" r="1" fill="#8b5cf6" />
            <circle cx="8" cy="10.5" r="1.5" fill="#8b5cf6" />
          </svg>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 72,
            fontWeight: 900,
            background: 'linear-gradient(to right, #8b5cf6, #3b82f6)',
            backgroundClip: 'text',
            color: 'transparent',
            margin: 0,
            marginBottom: 20,
          }}
        >
          GameVault
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 28,
            color: '#94a3b8',
            margin: 0,
            marginBottom: 40,
            maxWidth: 800,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          Biblioteca unificada de jogos com mais de 600 títulos
        </p>

        {/* Platform Badges */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: 900,
          }}
        >
          {['Steam', 'Epic', 'Xbox', 'GOG', 'Ubisoft', 'EA', 'Amazon'].map((platform) => (
            <div
              key={platform}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '12px 24px',
                borderRadius: 12,
                background: 'rgba(139, 92, 246, 0.1)',
                border: '2px solid rgba(139, 92, 246, 0.2)',
                fontSize: 20,
                color: '#e2e8f0',
                fontWeight: 600,
              }}
            >
              {platform}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
