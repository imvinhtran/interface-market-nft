/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAudio } from 'hooks/useAudio';
import React, { useContext, useState } from 'react';
import { PlayBtn } from '../styled';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { AudioContext } from 'contexts/AudioContext';

export interface IAudioProps {
	url: string;
	name: string;
}

export default function Audio({ url, name }: IAudioProps) {
	const { currentAudio } = useContext(AudioContext);
	const [playing, toggle] = useAudio(url);

	const handleToggle = (e: any) => {
		e.stopPropagation();

		toggle();
	};
	return (
		<PlayBtn onClick={handleToggle}>
			{currentAudio === url ? playing ? <PauseIcon /> : <PlayArrowIcon /> : <PlayArrowIcon />}
		</PlayBtn>
	);
}
