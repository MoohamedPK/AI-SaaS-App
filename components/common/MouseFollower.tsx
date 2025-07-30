"use client"

import React, { useState, useEffect } from 'react';

const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event:MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    // Add event listener to the window
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup: Remove event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <div
      style={{
        position: 'fixed', // or 'absolute' if within a positioned parent
        left: mousePosition.x,
        top: mousePosition.y,
        borderRadius: '50%',
        pointerEvents: 'none', // Ensures the follower doesn't block other mouse events
        transform: 'translate(-50%, -50%)', // Centers the element on the cursor
        zIndex: 9999, // Ensure it's on top
      }}
      className='bg-purple-600 mix-blend-multiply size-[8rem] blur-[40px]'
    ></div>
  );
};

export default MouseFollower;