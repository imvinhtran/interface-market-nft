/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, lazy, useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { BoxImage, MediaWrapper } from './styled';
//models
import { NFT } from 'models';
//components
import Loadable from 'components/CustomUI/LoadableComponent';
//utils
import { getFileType } from 'utils';
import { SizeContext } from 'contexts/SizeObserver';
import { Box } from '@mui/material';

const LazyImageCustom = Loadable(
	lazy(() => import('components/CustomUI/LazyImages/LazyImageCustom'))
);
export interface ItemImageProps {
	item: NFT | null;
}

export default function ItemImage({ item }: ItemImageProps) {
	const imgRef = useRef<any>(null);

	// useState
	const [color, setColor] = useState<string>('rgba(0,0,0,0)');
	const [type, setType] = useState<string>('');
	const [imgOffsetHeight, setImgOffsetHeight] = useState<number>(0);

	// context
	const { innerWidth } = useContext(SizeContext);

	// vars
	const maxImgHeight = innerWidth > 900 ? 800 : 500;

	useEffect(() => {
		if (!item) return;
		setType(getFileType(item.itemMedia));
		const el = new Image();
		el.src = item.itemMedia;
		el.addEventListener('onLoad', () => {
			console.log(el.naturalHeight);
		});
	}, [item]);

	useEffect(() => {
		if (imgRef && imgRef.current) {
			setImgOffsetHeight(imgRef.current.clientHeight);
			// const img = new Image(imgRef.current);
			// console.log(imgRef.current.naturalWidth);
		}
	}, [innerWidth]);

	return (
		<Fragment>
			<BoxImage sx={{ borderColor: color }}>
				{item && type === 'mp3' && (
					<Fragment>
						<Box sx={{ borderRadius: '20px', overflow: 'hidden' }}>
							<LazyImageCustom
								src={item.itemPreviewMedia}
								alt="item"
								type="skeleton"
								wrapperPosition="relative"
								style={{
									borderRadius: '20px',
									width: '100%',
									height: 'auto',
								}}
							/>
						</Box>

						{/* <MediaWrapper> */}
						<ReactPlayer
							url={item.itemMedia}
							className="react-player"
							muted={true}
							playing={true}
							loop={true}
							controls
							width="100%"
							height={50}
						/>
						{/* </MediaWrapper> */}
					</Fragment>
				)}
				{item && type === 'mp4' && (
					<MediaWrapper>
						<ReactPlayer
							url={item.itemMedia}
							className="react-player"
							muted={true}
							playing={true}
							loop={true}
							width="100%"
							height="100%"
						/>
					</MediaWrapper>
				)}
				{type !== 'mp3' && type !== 'mp4' && (
					<>
						<img
							ref={imgRef}
							src={item ? item.itemMedia : '/loadingNFT.gif'}
							alt="fake media"
							onLoad={() => {
								setImgOffsetHeight(imgRef.current.clientHeight);
							}}
							style={{
								width: '100%',
								height: 'auto',
								position: 'absolute',
								visibility: 'hidden',
								opacity: 0.3,
								zIndex: '-1000',
							}}
						/>

						<Box sx={{ borderRadius: '20px', overflow: 'hidden' }}>
							<LazyImageCustom
								src={item ? item.itemMedia : '/loadingNFT.gif'}
								alt="item"
								wrapperPosition="relative"
								type="skeleton"
								style={{
									borderRadius: '20px',
									margin: '0 auto',

									...(imgRef.current?.clientHeight > maxImgHeight
										? {
												width: 'auto',
												height: `${maxImgHeight}px`,
										  }
										: {
												width: '100%',
												height: 'auto',
										  }),
								}}
							/>
						</Box>
					</>
				)}
			</BoxImage>

			{/* <Stack
				direction="row"
				spacing={1.5}
				justifyContent="center"
				alignItems="center"
				sx={{ width: '100%', pt: 2 }}
			>
				<ColorPicker
					sx={{ background: 'rgba(0,0,0,0)' }}
					onClick={() => setColor('rgba(0,0,0,0)')}
				>
					<DoNotDisturbIcon width="100%" height="100%" />
				</ColorPicker>
				<ColorPicker
					sx={{
						background: '#061F46',
					}}
					onClick={() => setColor('#061F46')}
				></ColorPicker>
				<ColorPicker
					sx={{ background: 'green' }}
					onClick={() => setColor('green')}
				></ColorPicker>
				<ColorPicker
					sx={{ background: '#039BF2' }}
					onClick={() => setColor('#039BF2')}
				></ColorPicker>
			</Stack> */}
		</Fragment>
	);
}
