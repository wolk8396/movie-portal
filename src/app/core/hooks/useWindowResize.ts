import { useCallback, useEffect, useState } from "react";

interface WindowResizeHook {
	screenWidth: number;
  screenHeight: number;
};

export const useWindowResize = (): WindowResizeHook => {
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
	}, []);

  useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [screenWidth, screenHeight]);

  
  return { screenHeight, screenWidth };
};
