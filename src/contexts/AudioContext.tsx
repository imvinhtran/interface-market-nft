import React, { useState } from 'react';

interface AudioProps {
	currentAudio: null | string;
	handleSetCurrentAudio: (url: string) => void;
}

export const AudioContext = React.createContext<AudioProps>({
	currentAudio: null,
	handleSetCurrentAudio: () => {},
});

const AudioProvider: React.FC = ({ children }) => {
	const [currentAudio, setCurrentAudio] = useState<string | null>(null);

	const handleSetCurrentAudio = (url: string) => {
		setCurrentAudio(url);
	};

	return (
		<AudioContext.Provider value={{ currentAudio, handleSetCurrentAudio }}>
			{children}
		</AudioContext.Provider>
	);
};

export default AudioProvider;
