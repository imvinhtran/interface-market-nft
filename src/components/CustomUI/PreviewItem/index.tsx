/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Box, Stack, Typography, useTheme } from '@mui/material';
import { FieldTitleName } from 'components/Form/FormAddOrEditItem/styled';
import ReactPlayer from 'react-player';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import isString from 'lodash/isString';
//styled
import {
	AvatarIcon,
	GradIcon,
	ImageBlockchain,
	ItemCardStyle,
	ItemFooter,
	ItemImage,
	MediaWrapper,
} from '../Card/NFTItem/styled';
import LazyImageNFT from '../LazyImages/LazyImage';
import { EmptyContent, PreviewItemWrapper } from './styled';
// image
import IconTwitterWhite from 'assets/icons/twitter-white.webp';
import IconFavoriteThinWhite from 'assets/icons/favorite-thin-white.webp';
import IconTwitterBlack from 'assets/icons/twitter-black.webp';
import IconFavoriteThinBlack from 'assets/icons/favorite-thin-black.webp';
//constants
import { NULL_ADDRESS } from 'constants/address.constant';
//models
import { CustomFile } from 'models';
//utils
import { getFileType, generateGrad } from 'utils';
//components
import Audio from '../Card/NFTItem/Audio';
//redux
import { selectUser } from 'redux/slices/userSlice';
import { useSelector } from 'react-redux';

export interface IPreviewItemProps {
	media: CustomFile | string | null;
	thumbnail: CustomFile | string | null;
	name: string;
}

export default function PreviewItem({ media, thumbnail, name }: IPreviewItemProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';
	const [type, setType] = useState<string>('');

	//selector
	const userInfo = useSelector(selectUser);

	useEffect(() => {
		if (!media) return;
		setType(getFileType(media));
	}, [media]);

	const renderGradIcon = useMemo(
		() => (
			<GradIcon
				sx={{
					background: `${generateGrad(NULL_ADDRESS)}`,
				}}
			/>
		),
		[]
	);

	return (
		<Box>
			<FieldTitleName>Preview</FieldTitleName>
			<PreviewItemWrapper>
				<ItemCardStyle>
					<Box sx={{ p: 1.5 }}>
						{media ? (
							<Fragment>
								<ItemImage>
									{type === 'mp3' && thumbnail && (
										<Fragment>
											<LazyImageNFT
												src={
													isString(thumbnail)
														? thumbnail
														: thumbnail.preview!
												}
												alt="item"
											/>
											<Audio
												url={isString(media) ? media : media.preview!}
												name=""
											/>
										</Fragment>
									)}
									{type === 'mp4' && (
										<MediaWrapper>
											<ReactPlayer
												url={isString(media) ? media : media.preview}
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
										<LazyImageNFT
											src={isString(media) ? media : media.preview!}
											alt="item"
											style={{ borderRadius: '10px' }}
										/>
									)}
								</ItemImage>
								<Box sx={{ width: '100%', height: '100%', py: 1 }}>
									<Stack
										direction="row"
										alignItems="center"
										justifyContent="space-between"
										spacing={1}
									>
										<Box sx={{ width: '70%' }}>
											<Typography variant="h6" noWrap>
												{name}
											</Typography>
										</Box>

										<ImageBlockchain>
											{/* <img
											src={NETWORKINFO[item.chainId].image}
											alt="icon blockchain"
										/> */}
										</ImageBlockchain>
									</Stack>
								</Box>

								<ItemFooter>
									<Stack
										direction="row"
										justifyContent="space-between"
										alignItems="center"
										spacing={2}
										sx={{ padding: '8px 14px' }}
									>
										<Stack direction="row">
											<AvatarIcon sx={{ marginLeft: '-10px', zIndex: 1 }}>
												<Avatar
													sx={{ width: 25, height: 25 }}
													src={userInfo?.avatar}
													alt="creator"
												/>
											</AvatarIcon>
											<AvatarIcon sx={{ marginLeft: '-10px', zIndex: 1 }}>
												<Avatar
													sx={{ width: 25, height: 25 }}
													src={userInfo?.avatar}
													alt="creator"
												/>
											</AvatarIcon>
										</Stack>

										<Stack direction="row" alignItems="center" spacing={1.5}>
											{isLightTheme ? (
												<img
													src={IconTwitterBlack}
													height={18}
													width={20}
													alt="icon twitter"
												/>
											) : (
												<img
													src={IconTwitterWhite}
													height={18}
													width={20}
													alt="icon twitter"
												/>
											)}

											<Stack
												direction="row"
												alignItems="center"
												spacing={0.5}
											>
												<Box>
													{isLightTheme ? (
														<img
															src={IconFavoriteThinBlack}
															height={18.35}
															width={20}
															alt="icon favorite"
														/>
													) : (
														<img
															src={IconFavoriteThinWhite}
															height={18.35}
															width={20}
															alt="icon favorite"
														/>
													)}
												</Box>
											</Stack>
										</Stack>
									</Stack>
								</ItemFooter>
							</Fragment>
						) : (
							<EmptyContent>
								<Typography>Upload file to preview your NFT</Typography>
							</EmptyContent>
						)}
					</Box>
				</ItemCardStyle>
			</PreviewItemWrapper>
		</Box>
	);
}
