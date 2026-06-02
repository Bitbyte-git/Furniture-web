import { useEffect, useRef } from 'react';

/**
 * GlowCard — sage-green glowing border + spotlight on hover.
 * Uses box-shadow + radial-gradient overlay (no mask tricks).
 */

export function GlowCard({ children, className = '' }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    };

    card.addEventListener('mousemove', onMove);
    return () => card.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div
      ref={cardRef}
      className={`glow-card ${className}`}
      style={{
        '--mx': '50%',
        '--my': '50%',
        position: 'relative',
        borderRadius: '16px',
        overflow: 'hidden',
        border: '1.5px solid rgba(122,163,89,0.15)',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Mouse-tracking spotlight overlay */}
      <div
        style={{
          pointerEvents: 'none',
          position: 'absolute',
          inset: 0,
          zIndex: 30,
          borderRadius: '16px',
          background:
            'radial-gradient(200px circle at var(--mx) var(--my), rgba(122,163,89,0.22), transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
        }}
        className="glow-spotlight"
      />
      {/* Card content */}
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        {children}
      </div>

      <style>{`
        .glow-card:hover {
          border-color: rgba(122,163,89,0.75) !important;
          box-shadow:
            0 0 0 1px rgba(122,163,89,0.4),
            0 0 20px rgba(122,163,89,0.35),
            0 0 50px rgba(122,163,89,0.15),
            0 20px 40px rgba(0,0,0,0.4);
        }
        .glow-card:hover .glow-spotlight {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
