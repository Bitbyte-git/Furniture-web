import React from 'react';

export default function MapEmbed({ query = 'lakshmihayagreevar.com', height = 300, className = '' }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return (
    <div className={`w-full overflow-hidden rounded-2xl ${className}`}>
      <iframe
        title="Location map"
        src={src}
        width="100%"
        height={height}
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="rounded-2xl"
      />
    </div>
  );
}
