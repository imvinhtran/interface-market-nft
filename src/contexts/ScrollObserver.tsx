import React, { useEffect, useCallback, useState } from 'react';

interface ScrollValue {
	scrollY: number;
}

export const ScrollContext = React.createContext<ScrollValue>({
	scrollY: 0,
});

const ScrollObserver: React.FC = ({ children }) => {
	const [scrollY, setScrollY] = useState<number>(0);

	const handleScroll = useCallback(() => {
		setScrollY(window.scrollY);
	}, []);

	useEffect(() => {
		window.addEventListener('srcoll', handleScroll, { passive: true });

		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return <ScrollContext.Provider value={{ scrollY }}>{children}</ScrollContext.Provider>;
};

export default ScrollObserver;
