import { useEffect, useRef } from 'react';

const BackgroundAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const bgAnimation = containerRef.current;
    if (!bgAnimation) return;
    
    bgAnimation.innerHTML = '';
    
    const numberOfColorBoxes = 400;
    
    for (let i = 0; i < numberOfColorBoxes; i++) {
      const colorBox = document.createElement('div');
      colorBox.classList.add('colorBox');
      bgAnimation.appendChild(colorBox);
    }
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="bgAnimation"
    />
  );
};

export default BackgroundAnimation;