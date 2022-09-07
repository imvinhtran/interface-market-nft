/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
// utils
import { localStorageCustom } from 'utils';
// hooks
import useSettings from '../../../hooks/useSettings';
import { DarkLightImage, DarkLightStyle } from './styled';

export default function DarkLight() {
	const { themeMode, onChangeMode } = useSettings();

	const handleChangeThemeMode = (theme: string) => {
		if (theme === 'dark') {
			localStorageCustom.setThemeMode('dark');
			onChangeMode('dark');
		} else {
			localStorageCustom.setThemeMode('light');
			onChangeMode('light');
		}
	};

	useEffect(() => {
		const currentThemeMode: string | null = localStorageCustom.getThemeMode();

		if (currentThemeMode !== 'light') {
			localStorageCustom.setThemeMode('dark');
			onChangeMode('dark');
		} else {
			onChangeMode('light');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return themeMode === 'dark' ? (
		<DarkLightStyle onClick={() => handleChangeThemeMode('light')}>
			<DarkLightImage className="rotateImg">
				<LightModeIcon sx={{ color: '#ffffff' }} />
			</DarkLightImage>
		</DarkLightStyle>
	) : (
		<DarkLightStyle onClick={() => handleChangeThemeMode('dark')}>
			<DarkLightImage className="rotateImg">
				<DarkModeIcon sx={{ color: '#0768ff' }} />
			</DarkLightImage>
		</DarkLightStyle>
	);
}
