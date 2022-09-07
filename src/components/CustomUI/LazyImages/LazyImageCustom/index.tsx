/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, IconButton, Skeleton, Typography } from '@mui/material';
import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import CircularProgress, {
	circularProgressClasses,
	CircularProgressProps,
} from '@mui/material/CircularProgress';

const placeHolder = '/loadingNFT.gif';

export interface ILazyImageCustomProps {
	src: string;
	alt: string;
	wrapperPosition: 'absolute' | 'relative'; // In case that 'parent height' is depend on padding (ex: paddingTop: 100%;), we should use 'absolute' (parent also must have property 'position'). Else we use 'relative'.
	style?: object;
	type: 'skeleton' | 'progress';
	errorComponent?: React.ReactElement;
	refresh?: boolean;
}

export default function LazyImageCustom({
	src,
	alt,
	wrapperPosition,
	style,
	type,
	errorComponent,
	refresh = false,
}: ILazyImageCustomProps) {
	// useState
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);
	// const [imgSrc, setImgSrc] = useState<string>(src);
	const [refreshImg, setRefreshImg] = useState<boolean>(false);

	const handleOnLoad = () => {
		setTimeout(() => {
			setIsLoaded(true);
		}, 500);
	};

	const handleOnError = () => {
		setIsError(true);
		// setImgSrc(placeHolder);
	};

	function CustomCircularProgress(props: CircularProgressProps) {
		return (
			<Box sx={{ position: 'relative' }}>
				<CircularProgress
					variant="determinate"
					sx={{
						color: (theme) =>
							theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
					}}
					size={40}
					thickness={4}
					{...props}
					value={100}
				/>
				<CircularProgress
					variant="indeterminate"
					disableShrink
					sx={{
						color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
						animationDuration: '550ms',
						position: 'absolute',
						left: 0,
						[`& .${circularProgressClasses.circle}`]: {
							strokeLinecap: 'round',
						},
					}}
					size={40}
					thickness={4}
					{...props}
				/>
			</Box>
		);
	}

	useEffect(() => {
		setRefreshImg(!refreshImg);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	return (
		<Box sx={{ position: wrapperPosition, top: 0, left: 0, width: '100%', height: '100%' }}>
			<img
				loading="lazy"
				style={{ ...style, opacity: isLoaded ? 1 : 0 }}
				src={src}
				alt={alt}
				onLoad={handleOnLoad}
				onError={handleOnError}
			/>

			{!isLoaded && !isError && (
				<>
					{type === 'skeleton' ? (
						<Skeleton
							variant="rectangular"
							sx={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
							}}
						/>
					) : (
						<Box
							sx={{
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
							}}
						>
							<CustomCircularProgress />
						</Box>
					)}
				</>
			)}
			{/* {errorComponent} */}
			{isError && errorComponent}
		</Box>
	);
}
