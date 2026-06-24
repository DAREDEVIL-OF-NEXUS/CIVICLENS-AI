import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function CometCursor() {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setTrail((prev) => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: Math.random() }];
        if (newTrail.length > 60) newTrail.shift();
        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTrail((prev) => {
        if (prev.length > 0) return prev.slice(1);
        return prev;
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {trail.map((point, index) => (
        <motion.div
          key={point.id}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            left: point.x,
            top: point.y,
            width: `${(index + 1) * 0.8}px`,
            height: `${(index + 1) * 0.8}px`,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00f2fe 0%, #4facfe 100%, #fff 100%)',
            boxShadow: `0 0 ${index * 0.5}px #00f2fe, 0 0 ${index}px #4facfe, 0 0 ${index * 1.5}px #fff`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
      {trail.length > 0 && (
        <div
          style={{
            position: 'absolute',
            left: trail[trail.length - 1].x,
            top: trail[trail.length - 1].y,
            width: '18px',
            height: '18px',
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 0 20px #fff, 0 0 40px #00f2fe, 0 0 60px #8b5cf6',
            transform: 'translate(-50%, -50%)',
          }}
        />
      )}
    </div>
  );
}

export default CometCursor;
