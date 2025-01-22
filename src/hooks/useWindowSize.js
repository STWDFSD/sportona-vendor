import { useEffect, useState } from 'react';

const useWindowSize = () => {
  const [screen, setScreen] = useState({
    width: window?.innerWidth,
    height: window?.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setScreen({
        ...screen,
        width: window?.innerWidth,
        height: window?.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width: screen.width,
    height: screen.height,
  };
};

export default useWindowSize;
