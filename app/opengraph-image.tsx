import { ImageResponse } from 'next/og';

export const alt = 'Denis Kazakov frontend developer portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: '#121318',
          color: '#eef4fb',
          display: 'flex',
          height: '100%',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
        }}
      >
        <div
          style={{
            background: '#8be36d',
            borderRadius: 999,
            filter: 'blur(84px)',
            height: 250,
            opacity: 0.28,
            position: 'absolute',
            right: -70,
            top: -80,
            width: 250,
          }}
        />
        <div
          style={{
            background: '#b82ce0',
            borderRadius: 999,
            bottom: -110,
            filter: 'blur(92px)',
            height: 290,
            left: -90,
            opacity: 0.3,
            position: 'absolute',
            width: 290,
          }}
        />
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            height: 510,
            justifyContent: 'space-between',
            padding: 58,
            position: 'relative',
            width: 1040,
          }}
        >
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                alignItems: 'center',
                display: 'flex',
                gap: 18,
              }}
            >
              <div
                style={{
                  alignItems: 'center',
                  background: '#eef4fb',
                  border: '1px solid rgba(255,255,255,0.18)',
                  borderRadius: 10,
                  color: '#121318',
                  display: 'flex',
                  fontFamily: 'monospace',
                  fontSize: 22,
                  fontWeight: 900,
                  height: 54,
                  justifyContent: 'center',
                  letterSpacing: -1,
                  width: 118,
                }}
              >
                {'</>'}
              </div>
              <div
                style={{
                  fontSize: 38,
                  fontWeight: 900,
                  letterSpacing: 8,
                }}
              >
                DENIS
              </div>
            </div>
            <div
              style={{
                color: '#8be36d',
                fontSize: 22,
                fontWeight: 800,
              }}
            >
              React / Next.js / TypeScript
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                color: '#a1a1aa',
                fontSize: 28,
                fontWeight: 800,
                marginBottom: 26,
              }}
            >
              Denis Kazakov
            </div>
            <div
              style={{
                fontSize: 86,
                fontWeight: 900,
                letterSpacing: -1,
                lineHeight: 0.92,
                maxWidth: 760,
              }}
            >
              Frontend Developer
            </div>
            <div
              style={{
                color: '#d4d4d8',
                fontSize: 28,
                fontWeight: 700,
                lineHeight: 1.35,
                marginTop: 34,
                maxWidth: 780,
              }}
            >
              Building modern web interfaces with clean UI, motion and scalable
              frontend architecture.
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
