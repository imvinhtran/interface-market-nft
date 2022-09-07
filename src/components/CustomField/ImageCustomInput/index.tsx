/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactPlayer from 'react-player';
// styled
import { ImageDefault, ImageInputContainer, ImageStyle } from './styled';
// images
import ImageInputDefault from 'assets/images/home/image-input-default.webp';
// components
import FieldInput from '../FieldInput';
export interface ImageCustomProps {
	media: any;
	registerHookForm: object;
	handleChangeFile: Function;
	readOnly?: boolean;
}

export default function MediaCustomInput({
	media,
	registerHookForm,
	handleChangeFile,
	readOnly,
}: ImageCustomProps) {
	console.log(media);
	return (
		<ImageInputContainer>
			{media.preview ? (
				<ImageStyle src={media.preview} alt="preview" />
			) : (
				<ImageDefault src={ImageInputDefault} alt="default" />
			)}

			{/* <Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column',
					overflow: 'hidden',
					width: '100%',
					height: '100%',
				}}
			>
				{media.preview && (
					<ReactPlayer
						url={media.preview}
						// muted={true}
						// className="react-player"
						playing={true}
						// loop={true}
						controls
						width="80%"
						height="80%"
					/>
				)}
			</Box> */}

			{!readOnly && (
				<FieldInput
					type="file"
					registerHookForm={registerHookForm}
					onChange={handleChangeFile}
				/>
			)}
		</ImageInputContainer>
	);
}
