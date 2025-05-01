/**
 * Helper function to position color boxes randomly on screen
 */
export const positionBoxes = (container: HTMLElement) => {
  const boxes = container.querySelectorAll('.colorBox');
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  
  boxes.forEach((box, index) => {
    const htmlBox = box as HTMLElement;
    
    // Generate random position
    const randomX = Math.random() * containerWidth;
    const randomY = Math.random() * containerHeight;
    
    // Set position
    htmlBox.style.left = `${randomX}px`;
    htmlBox.style.top = `${randomY}px`;
    
    // Add slight variability to size
    const size = 30 + Math.random() * 20;
    htmlBox.style.width = `${size}px`;
    htmlBox.style.height = `${size}px`;
    
    // Add a different animation delay for each box
    htmlBox.style.animationDelay = `${index * 0.02}s`;
  });
};