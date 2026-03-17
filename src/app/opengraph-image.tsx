import { ImageResponse } from 'next/og';

/**
 * @fileOverview Dynamic Open Graph image generation for GameFlashX.
 * Renders a premium gaming-themed banner for social media sharing.
 */

export const runtime = 'edge';

// Image metadata
export const alt = 'GameFlashX - Unlock Free Gift Cards & Premium Rewards';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Futuristic Background Grid Effect (Simulated) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(250, 70, 22, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(196, 0, 6, 0.1) 0%, transparent 50%)',
            opacity: 0.8,
          }}
        />

        {/* Ambient Glows */}
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-10%',
            width: '500px',
            height: '500px',
            background: 'rgba(250, 70, 22, 0.1)',
            filter: 'blur(100px)',
            borderRadius: '50%',
          }}
        />

        {/* Brand Name Corner */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '60px',
            display: 'flex',
            alignItems: 'center',
            fontSize: '32px',
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-0.05em',
            textTransform: 'uppercase',
          }}
        >
          GAMEFLASH<span style={{ color: '#FA4616' }}>X</span>
        </div>

        {/* Main Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '0 100px',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: '58px',
              fontWeight: 800,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            UNLOCK FREE GIFT CARD &
          </div>
          <div
            style={{
              fontSize: '82px',
              fontWeight: 900,
              color: '#FA4616',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              textShadow: '0 0 40px rgba(250, 70, 22, 0.4)',
            }}
          >
            PREMIUM REWARD
          </div>
        </div>

        {/* Bottom Trust Line */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            color: 'rgba(255, 255, 255, 0.3)',
            fontSize: '16px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.3em',
          }}
        >
          <span>Instant Delivery</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
          <span>Verified Secure</span>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
          <span>Global Access</span>
        </div>

        {/* Decorative Borders */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, #FA4616, transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, transparent, #FA4616, transparent)' }} />
      </div>
    ),
    {
      ...size,
    }
  );
}
