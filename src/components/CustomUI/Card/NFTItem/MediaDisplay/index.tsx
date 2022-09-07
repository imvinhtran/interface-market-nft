import React, { Fragment, useState } from 'react';
import ReactPlayer from 'react-player';
import RefreshIcon from '@mui/icons-material/Refresh';
//compoents
import LazyImageCustom from 'components/CustomUI/LazyImages/LazyImageCustom';
import Audio from '../Audio';
//styled
import { MediaErrorContent, MediaWrapper } from '../styled';
//utils
import { compressImage, getFileType } from 'utils';
import { IconButton, Typography } from '@mui/material';

export interface IMediaDisplayProps {
	media: string;
	preview: string;
	name: string;
}

export default function MediaDisplay({ media, preview, name }: IMediaDisplayProps) {
	const [type] = useState<string>(getFileType(media));
	const [rendered, setRendered] = useState<boolean>(true);

	const ErrorMediaRender = () => {
		return (
			<MediaErrorContent>
				<Typography variant="h6">Error</Typography>
				<Typography variant="body2">
					Something went wrong when load this media. Please refresh
				</Typography>
				<IconButton
					aria-label="refresh"
					onClick={(e) => {
						e.stopPropagation();
						setRendered(false);
						setTimeout(() => {
							setRendered(true);
						}, 1);
					}}
				>
					<RefreshIcon />
				</IconButton>
			</MediaErrorContent>
		);
	};

	return (
		<Fragment>
			{rendered ? (
				<>
					{type === 'mp3' && (
						<Fragment>
							<LazyImageCustom
								src={compressImage(preview, 480, 'best')}
								alt="item"
								wrapperPosition="absolute"
								style={{ borderRadius: '10px' }}
								type="progress"
								errorComponent={ErrorMediaRender()}
							/>
							<Audio url={compressImage(media, 480, 'best')} name={name} />
						</Fragment>
					)}
					{type === 'mp4' && (
						<MediaWrapper>
							<ReactPlayer
								url={compressImage(media, 480, 'best')}
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
						<LazyImageCustom
							src={compressImage(media, 480, 'best')}
							alt="item"
							wrapperPosition="absolute"
							style={{ borderRadius: '10px' }}
							type="progress"
							errorComponent={ErrorMediaRender()}
						/>
					)}
				</>
			) : (
				<></>
			)}
		</Fragment>
	);
}
