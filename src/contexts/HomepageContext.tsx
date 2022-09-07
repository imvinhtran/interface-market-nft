import React, { useState } from 'react';

interface HomeProps {
	displayGallery: boolean;
	handleDisplayGallery: (value: boolean) => void;
}

export const HomepageContext = React.createContext<HomeProps>({
	displayGallery: false,
	handleDisplayGallery: () => {},
});

const HomepageProvider: React.FC = ({ children }) => {
	const [displayGallery, setDisplayGallery] = useState<boolean>(false);
	const handleDisplayGallery = (value: boolean) => {
		setDisplayGallery(value);
	};

	return (
		<HomepageContext.Provider value={{ displayGallery, handleDisplayGallery }}>
			{children}
		</HomepageContext.Provider>
	);
};

export default HomepageProvider;
