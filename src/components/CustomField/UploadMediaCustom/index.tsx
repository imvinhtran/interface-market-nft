import { Box, Stack, SxProps, Theme, Typography } from '@mui/material';
import isString from 'lodash/isString';
import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import ReactPlayer from 'react-player';
import { fData, getFileType } from 'utils';
import { ChangeBtn, DropzoneContainer, DropzoneStyle, ImageDefault } from './styled';
import ImageInputDefault from 'assets/images/home/image-input-default.webp';
import { CustomFile } from 'models';

interface UploadMediaCustomProps extends DropzoneOptions {
	error?: boolean;
	file: CustomFile | string | null;
	caption?: ReactNode;
	sx?: SxProps<Theme>;
}

export default function UploadMediaCustom({
	error,
	file,
	caption,
	sx,
	...other
}: UploadMediaCustomProps) {
	const [type, setType] = useState<string>('');
	const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone(
		{
			multiple: false,
			...other,
		}
	);

	useEffect(() => {
		if (!file) return;
		const fileType = getFileType(file);
		setType(fileType);
	}, [file]);

	const ShowRejectionItems = () => (
		<Box>
			{fileRejections.map(({ file, errors }) => {
				const { path, size }: CustomFile = file;
				return (
					<Box key={path} sx={{ my: 1 }}>
						<Typography variant="body1" noWrap>
							{path} - {fData(size)}
						</Typography>

						<Typography variant="body1" noWrap sx={{ color: 'red' }}>
							File is larger than 50MB
						</Typography>
					</Box>
				);
			})}
		</Box>
	);

	return (
		<DropzoneContainer sx={sx}>
			<DropzoneStyle
				{...getRootProps()}
				sx={{
					...(isDragActive && { opacity: 0.72 }),
					...((isDragReject || error) && { color: 'red' }),
				}}
			>
				<input
					{...getInputProps()}
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						opacity: 0,
						cursor: 'pointer',
					}}
				/>
				{/* {file && (
						
					)} */}
				{file ? (
					<Fragment>
						{type === 'mp4' || type === 'mp3' ? (
							<Stack sx={{ width: '100%' }}>
								{type === 'mp3' && <ChangeBtn>Change</ChangeBtn>}
								<ReactPlayer
									url={isString(file) ? file : file.preview}
									className="Player"
									muted={true}
									playing={true}
									loop={true}
									controls
									width="100%"
									height={type === 'mp3' ? 50 : '100%'}
								/>
							</Stack>
						) : (
							<Box
								component="img"
								alt="avatar"
								src={isString(file) ? file : file.preview}
								sx={{ zIndex: 8, objectFit: 'cover' }}
							></Box>
						)}
					</Fragment>
				) : (
					<ImageDefault>
						<img
							src={ImageInputDefault}
							className="placeholder-img"
							alt="default"
							width={80}
							height={80}
						/>
					</ImageDefault>
				)}
			</DropzoneStyle>

			{fileRejections.length > 0 && <ShowRejectionItems />}
		</DropzoneContainer>
	);
}
