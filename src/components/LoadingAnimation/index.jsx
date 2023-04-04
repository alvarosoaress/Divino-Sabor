import React from 'react';
import { GlassFull } from './styled';

export default function LoadingAnimation() {
  return (
    <span
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: window.screen.width >= 800 ? '25vw' : '50vw',
        height: '25vh',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <GlassFull animation="tinOne" />
      <GlassFull animation="tinTwo" />
    </span>
  );
}
