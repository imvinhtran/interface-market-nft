import { AudioContext } from 'contexts/AudioContext';
import { useState, useEffect, useContext } from 'react';

export const useAudio = (url: string) => {
	const [audio] = useState(new Audio(url));
	const [playing, setPlaying] = useState<boolean>(false);
	const { currentAudio, handleSetCurrentAudio } = useContext(AudioContext);

	const toggle = () => {
		setPlaying(!playing);
		handleSetCurrentAudio(url);
	};

	useEffect(() => {
		if (currentAudio === url) {
			playing ? audio.play() : audio.pause();
		} else {
			audio.pause();
			setPlaying(false);
		}
		return () => audio.pause();
	}, [audio, playing, currentAudio, url]);

	useEffect(() => {
		if (!audio) return;
		audio.addEventListener('ended', () => setPlaying(false));
		return () => {
			audio.removeEventListener('ended', () => setPlaying(false));
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [playing, toggle] as const;
};
