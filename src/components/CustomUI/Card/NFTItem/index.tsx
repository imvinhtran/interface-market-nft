/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { TwitterShareButton } from 'react-share';
import { useInView } from 'react-cool-inview';
//mui
import { Avatar, Box, IconButton, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RefreshIcon from '@mui/icons-material/Refresh';
// image
import IconTwitterWhite from 'assets/icons/twitter-white.webp';
import IconFavoriteThinWhite from 'assets/icons/favorite-thin-white.webp';

import IconTwitterBlack from 'assets/icons/twitter-black.webp';
import IconFavoriteThinBlack from 'assets/icons/favorite-thin-black.webp';
//styled
import {
	AvatarIcon,
	BoxCountDown,
	ErrorContent,
	GradIcon,
	ImageBlockchain,
	ItemCardStyle,
	ItemFooter,
	ItemImage,
	MediaWrapper,
	PlayBtn,
	PriceChangeStyle,
	PriceStyle,
} from './styled';

import { useNavigate } from 'react-router-dom';

// models
import { InteractionInput, NFT } from 'models';
// utils
import { compressImage, formatNumber, generateGrad, getFileType, signTransaction } from 'utils';
import nftsApi from 'apis/nftsApi';
//redux
import { useDispatch, useSelector } from 'react-redux';
import {
	selectAddress,
	selectCurrentProvider,
	selectSignature,
	setSignature,
} from 'redux/slices/web3InfoSlice';
import { toast } from 'react-toastify';
import interactionApi from 'apis/interactionApi';

// constants
import { ITEM_STATUS, NETWORKINFO, NULL_ADDRESS } from '../../../../constants';
//components
import LazyImageNFT from '../../LazyImages/LazyImage';
import MediaDisplay from './MediaDisplay';
import SkeletonNFTItemCard from '../../Skeleton/Item/SkeletonNFTItem';

export interface NFTItemProps {
	itemId: any;
}

export default function NFTItem({ itemId }: NFTItemProps) {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();

	// useState
	const [totalFavorite, setTotalFavorite] = useState<number>(0);
	const [likeState, setLikeState] = useState<boolean>(false);
	const [item, setItem] = useState<NFT>();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [refresh, setRefresh] = useState<boolean>(true);
	const [itemHeight, setItemHeight] = useState<number>(0);

	// useSelector
	const userAddress = useSelector(selectAddress);
	const signature = useSelector(selectSignature);
	const provider = useSelector(selectCurrentProvider);

	// useRef
	const interactionRef = useRef<any>(null);
	let nftRef = useRef<any>();

	// vars
	const isLightTheme = theme.palette.mode === 'light';

	const {
		observe,
		inView,
		scrollDirection: { vertical, horizontal },
	} = useInView({
		threshold: 0.25, // Default is 0
		onEnter: ({ scrollDirection, entry, observe, unobserve }) => {
			// console.log('in view');
			// Triggered when the target enters the viewport
		},
		onLeave: ({ scrollDirection, entry, observe, unobserve }) => {
			// console.log('out view');
			// Triggered when the target leaves the viewport
		},
	});

	useEffect(() => {
		if (nftRef.current) {
			setItemHeight(nftRef.current.clientHeight);
		}
	}, [nftRef]);

	useEffect((): any => {
		// if (!itemId || !userAddress || !chainId) return;
		if (!itemId) return;
		let mounted = true;

		(async () => {
			setIsLoading(true);

			try {
				const res: NFT = await nftsApi.getLessNftInfoByTokenId({
					itemId: itemId._id,
					userAddress:
						userAddress ?? '0x00B91B2F8aFE87FCDc2b3fFA9ee2278cd1E4DDf8'.toLowerCase(),
				});

				if (mounted) {
					setItem(res);
					setTotalFavorite(res.interaction);
					setLikeState(res.isLike);
					setIsSuccess(true);
				}
			} catch (error) {
				setIsLoading(false);
				setIsSuccess(false);
				console.log(error);
			} finally {
				if (mounted) {
					setIsLoading(false);
				}
			}
		})();

		return () => (mounted = false);
	}, [itemId, userAddress, refresh]);

	const signMessage = async () => {
		const result = await signTransaction(
			provider,
			'ForbitswapNFTSExchange\nI would like to put this item into the favorite space:\nef04e185d38bc6e4b274cf6a3e6b89c8772894a7f629ba1d123f247da9e173cd',
			userAddress
		);
		dispatch(setSignature(result));
		return result;
	};

	const handleFavorite = async (state: boolean) => {
		try {
			let sig = signature;
			if (!signature) {
				sig = await signMessage();
			}
			if (likeState) {
				setTotalFavorite(totalFavorite - 1);
			} else setTotalFavorite(totalFavorite + 1);

			setLikeState(!likeState);
			if (interactionRef) {
				clearTimeout(interactionRef.current);
			}

			if (userAddress) {
				interactionRef.current = setTimeout(async () => {
					const data: InteractionInput = {
						itemId: itemId._id,
						userAddress,
						state,
						signature: sig!,
					};
					console.log(data);
					await interactionApi.interactionNft(data);
				}, 500);
			}
		} catch (error: any) {
			toast.error(error.message);
		}
	};

	const renderItemPrice = (item: NFT) => {
		if (item.status === ITEM_STATUS.BUY_NOW) {
			return (
				<PriceStyle variant="body1" noWrap>
					{formatNumber(item.currentPrice, 0, 4)} {item.listingPriceType.toUpperCase()}
				</PriceStyle>
			);
		} else {
			return (
				<PriceStyle variant="body1" noWrap>
					Unlisted
				</PriceStyle>
			);
		}
	};

	const creatorAvatar = useMemo(() => {
		return generateGrad(item ? item.creator : NULL_ADDRESS);
	}, [item]);

	const ownerAvatar = useMemo(() => {
		return generateGrad(item ? item.owner : NULL_ADDRESS);
	}, [item]);

	return (
		<Box ref={observe}>
			{
				// inView ? (
				!isLoading ? (
					!isSuccess ? (
						<Box sx={{ position: 'relative' }}>
							<ItemCardStyle sx={{ height: 403.6 }}>
								<ErrorContent>
									<Typography variant="h6">Error</Typography>
									<Typography variant="body2">
										Something went wrong when load this NFT. Please refresh
									</Typography>
									<IconButton
										aria-label="refresh"
										onClick={(e) => {
											e.stopPropagation();
											setRefresh(!refresh);
										}}
									>
										<RefreshIcon />
									</IconButton>
								</ErrorContent>
							</ItemCardStyle>
						</Box>
					) : item ? (
						<Box sx={{ position: 'relative' }} ref={nftRef}>
							<ItemCardStyle>
								<Box sx={{ p: 1.5 }}>
									<Box
										sx={{ cursor: 'pointer' }}
										onClick={() => navigate(`/detail/${item.itemId}`)}
									>
										<ItemImage>
											{/* <BoxCountDown>
								<CountDown
									timeEnd={new Date('1/30/2022 13:59:00').getTime()}
								/>
							</BoxCountDown> */}

											<MediaDisplay
												media={item.itemMedia}
												preview={item.itemPreviewMedia}
												name={item.itemName}
											/>
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
														{item.itemName}
													</Typography>
												</Box>

												<Tooltip
													title={NETWORKINFO[item.chainId].name}
													placement="top"
													aria-describedby="tip1"
													arrow
												>
													<ImageBlockchain>
														<img
															src={NETWORKINFO[item.chainId].image}
															alt="icon blockchain"
														/>
													</ImageBlockchain>
												</Tooltip>
											</Stack>

											<Stack
												direction="row"
												alignItems="end"
												justifyContent="space-between"
												spacing={1}
												sx={{ paddingTop: '10px' }}
											>
												{/* &gt; 0.001 ETH */}
												{renderItemPrice(item)}

												<PriceChangeStyle
													variant="caption"
													noWrap
													sx={{ opacity: '0.5' }}
												>
													{Number(item.usdPrice) !== 0
														? `($${formatNumber(item.usdPrice, 2)})`
														: ''}
												</PriceChangeStyle>
											</Stack>
										</Box>
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
												<Tooltip
													title={`Creator: ${item.creator?.substring(
														0,
														10
													)}...${item.creator.substring(37)}`}
													placement="top"
													aria-describedby="tip1"
												>
													<AvatarIcon>
														{item.creatorInfo?.avatar ===
														'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' ? (
															<GradIcon
																sx={{
																	background: creatorAvatar,
																}}
															/>
														) : (
															<Avatar
																sx={{ width: 25, height: 25 }}
																src={item.creatorInfo?.avatar}
																alt="creator"
															/>
														)}
													</AvatarIcon>
												</Tooltip>
												<Tooltip
													title={`Owner: ${item.owner.substring(
														0,
														10
													)}...${item.owner.substring(37)}`}
													placement="top"
													aria-describedby="tip1"
												>
													<AvatarIcon
														sx={{ marginLeft: '-10px', zIndex: 1 }}
													>
														{item.ownerInfo?.avatar ===
														'https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg' ? (
															<GradIcon
																sx={{
																	background: ownerAvatar,
																}}
															/>
														) : (
															<Avatar
																sx={{ width: 25, height: 25 }}
																src={item.ownerInfo?.avatar}
																alt="creator"
															/>
														)}
													</AvatarIcon>
												</Tooltip>
											</Stack>

											<Stack
												direction="row"
												alignItems="center"
												spacing={1.5}
											>
												<TwitterShareButton
													url={`https://nftspacex.io/#/detail/${item.itemId}`}
													// url="https://nftspacex.io/#/detail/6273b63badcba59d78a9bc75"
													title={`Look what I found! ${item.itemName} collectible`}
													hashtags={['Music', 'Game']}
													via="NFTSpaceX"
												>
													<Box
														sx={{
															cursor: 'pointer',
														}}
														onClick={() => {}}
													>
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
													</Box>
												</TwitterShareButton>

												<Stack
													direction="row"
													alignItems="center"
													spacing={0.5}
												>
													<Box
														sx={{
															cursor: 'pointer',
														}}
														onClick={() => handleFavorite(!likeState)}
													>
														{likeState ? (
															<FavoriteIcon
																sx={{
																	marginBottom: '-6px !important',
																}}
															/>
														) : // <FavoriteBorderIcon />
														isLightTheme ? (
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
													<Typography variant="body1">
														{totalFavorite}
													</Typography>
												</Stack>
											</Stack>
										</Stack>
									</ItemFooter>
								</Box>
							</ItemCardStyle>
						</Box>
					) : (
						<></>
					)
				) : (
					<SkeletonNFTItemCard />
				)
			}
		</Box>
	);
}
