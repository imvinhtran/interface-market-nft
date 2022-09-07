/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { formatEther } from '@ethersproject/units';
import { useNavigate } from 'react-router-dom';
import { BigNumber } from 'ethers';
import moment from 'moment';
// model
import { NFT, OrderResponseAPI, TokenPayment } from 'models';
// mui
import { Box, Stack, Tooltip, Typography, useTheme } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// components
import ButtonOffer from '../../ExecuteButton/ButtonOffer';
import ItemPrice from '../../ItemPrice';
import Countdown from '../../Countdown';
import SkeletonItemInfo from 'components/CustomUI/Skeleton/Page/ItemDetail/SkeletonItemInfo';
import ButtonGroupOptions from '../../ButtonGroupOptions';
import ButtonBuy from '../../ExecuteButton/ButtonBuy';
import ButtonSell from '../../ExecuteButton/ButtonSell';
import ButtonCancelSelling from '../../ExecuteButton/ButtonCancelSelling';
import ButtonCancelOffer from '../../ExecuteButton/ButtonCancelOffer';
// image
import IconLockWhite from 'assets/icons/lock-white.webp';
import IconLockBlack from 'assets/icons/lock-black.webp';
import IconFreezeWhite from 'assets/icons/freeze-white.webp';
import IconFreezeBlack from 'assets/icons/freeze-black.webp';
// styled
import { BoxSubContent, CollectionName, ItemName, ItemOwner } from './styled';
// constants
import { ETHERSCAN } from 'constants/etherscan.constant';
import { ITEM_STATUS, ORDER_CONFIGURATION } from '../../../../../constants';
//redux
import { useSelector } from 'react-redux';
import { selectAddress } from 'redux/slices/web3InfoSlice';
import { selectListTokenPayment } from 'redux/slices/tokenPaymentSlice';
import { selectLoading as selectLoadingItem } from 'redux/slices/nftItemByItemIdSlice';
//utils
import {
	compareDate,
	erc20function,
	formatNumber,
	isNativeToken,
	sliceAddress,
	sliceString,
	timestampToDate,
} from 'utils';
//api
import tokenPaymentApi from 'apis/tokenPaymentApi';
import DividerGradient from 'components/CustomUI/DividerGradient';

export interface ItemInfoTabProps {
	item: NFT | null;
	personalOffer: OrderResponseAPI | null;
	loadingPersonalOffer: boolean;
	refetchApi: VoidFunction;
}

export default function ItemInfoTab({
	item,
	personalOffer,
	loadingPersonalOffer,
	refetchApi,
}: ItemInfoTabProps) {
	const navigate = useNavigate();
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	// useState
	const [extra, setExtra] = useState<number>(0);
	const [extraUSD, setExtraUSD] = useState<number>(0);
	const [expirationTime, setExpirationTime] = useState<string>('');

	// useSelector
	const currentAddress = useSelector(selectAddress);
	const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);
	const isLoadingItem = useSelector(selectLoadingItem);

	// useEffect
	// fetch basePrice, usdPrice of item and icon of tokenPayment
	useEffect(() => {
		(async () => {
			try {
				if (item && item.order && listTokenPayment.length > 0) {
					const currentToken = listTokenPayment.find(
						(token) => token.address === item.order?.paymentToken
					);
					if (currentToken) {
						//expirationTime
						setExpirationTime(
							new Date(Number(item.order.expirationTime) * 1000).toString()
						);

						if (item.order.saleKind === ORDER_CONFIGURATION.DUTCH_AUCTION) {
							// convert extra
							if (isNativeToken(currentToken.address)) {
								setExtra(Number(formatEther(item.order.extra)));
							} else {
								let extraRs = await erc20function().changeWeiToToken(
									currentToken.address,
									BigNumber.from(item.order.extra)
								);

								setExtra(Number(extraRs));
							}

							// convert extra to USD
							const result = await tokenPaymentApi.changeTokenToUsd(
								currentToken.symbol,
								'USD',
								item.order.extra
							);
							setExtraUSD(result.data);
						}
					}
				}
			} catch (error: any) {
				console.log(error.message);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listTokenPayment, item]);

	return !isLoadingItem ? (
		item ? (
			<>
				<Box sx={{ position: 'relative' }}>
					<ButtonGroupOptions
						itemId={item.itemId}
						itemName={item.itemName}
						refetchApi={refetchApi}
					/>
				</Box>
				{/* Name */}
				<CollectionName
					variant="h6"
					sx={{ pt: 2, fontWeight: '100' }}
					onClick={() =>
						navigate(item.collectionId ? `/collections/view/${item.collectionId}` : '#')
					}
				>
					{item.collection?.collectionName
						? sliceString(item.collection.collectionName, 25)
						: ''}
				</CollectionName>
				<ItemName sx={{ mt: 2, fontWeight: '100' }} variant="h3">
					{sliceString(item.itemName, 25)}
				</ItemName>
				<ItemOwner sx={{ fontWeight: '100', mt: 1 }} variant="h6">
					Created by{' '}
					<span
						onClick={() =>
							currentAddress === item.creator
								? navigate(`/my-info-account`)
								: navigate(`/info-account/${item.creator}`)
						}
					>
						{currentAddress === item.creator ? 'You' : sliceAddress(item.creator, 8, 5)}
					</span>
				</ItemOwner>
				<ItemOwner sx={{ fontWeight: '100' }} variant="h6">
					Owned by{' '}
					<span
						onClick={() =>
							currentAddress === item.owner
								? navigate(`/my-info-account`)
								: navigate(`/info-account/${item.owner}`)
						}
					>
						{currentAddress === item.owner ? 'You' : sliceAddress(item.owner, 8, 5)}
					</span>
				</ItemOwner>
				<DividerGradient sx={{ mt: '1rem' }} />

				{/* Sub content */}
				<BoxSubContent sx={{ pt: 2 }}>
					{isLightTheme ? (
						<img src={IconLockBlack} alt="lock icon" width={20} height={20} />
					) : (
						<img src={IconLockWhite} alt="lock icon" width={20} height={20} />
					)}

					<Typography variant="h6" sx={{ p: '0 10px', fontWeight: '100' }}>
						Includes unlockable content.
					</Typography>
				</BoxSubContent>

				<BoxSubContent sx={{ pt: 2 }}>
					{isLightTheme ? (
						<img src={IconFreezeBlack} alt="lock icon" width={20} height={20} />
					) : (
						<img src={IconFreezeWhite} alt="lock icon" width={20} height={20} />
					)}

					<Typography variant="h6" sx={{ p: '0 10px', fontWeight: '100' }}>
						{item.isFreeze ? 'Item is frozen.' : 'Not frozen yet.'}
					</Typography>
				</BoxSubContent>

				{/* <ButtonFreeze refetchApi={refetchApi} /> */}

				{item.status !== ITEM_STATUS.NOT_FOR_SELL && item.order && (
					<Fragment>
						{compareDate(
							new Date(),
							timestampToDate(parseInt(item.order.listingTime))
						) > 0 ? (
							<BoxSubContent sx={{ mt: 2 }}>
								<AccessTimeIcon sx={{ width: '22px', height: '22px' }} />

								<Typography variant="h6" sx={{ p: '0 8px' }}>
									Sale ends{' '}
									{moment(expirationTime).format('MMMM Do, YYYY h:mm a')}
								</Typography>
							</BoxSubContent>
						) : (
							<Countdown
								endTime={item.order.listingTime}
								title="Will be listed after: "
							/>
						)}

						{/* Price */}
						<Typography variant="h6" sx={{ pt: '1rem', pb: '0.5rem' }}>
							Current price
						</Typography>
						<Stack
							spacing={1}
							direction="row"
							justifyContent="flex-start"
							alignItems="flex-end"
						>
							<Tooltip
								title={item.listingPriceType.toUpperCase()}
								placement="top"
								aria-describedby="tip1"
								arrow
							>
								<img
									loading="lazy"
									src={item.priceLogo}
									alt="token icon"
									width={32}
									height={32}
									style={{ cursor: 'pointer', borderRadius: '50%' }}
								/>
							</Tooltip>

							{item.order.saleKind === ORDER_CONFIGURATION.FIXED_PRICE ? (
								<>
									<Typography variant="h3" sx={{ lineHeight: 1 }}>
										{formatNumber(item.currentPrice, 0, 4)}
									</Typography>
									<Typography variant="subtitle2">
										($
										{formatNumber(item.usdPrice, 0, 3)})
									</Typography>
								</>
							) : extra && extraUSD ? (
								<ItemPrice
									basePrice={Number(item.currentPrice)}
									usdPrice={Number(item.usdPrice)}
									saleKind={item.order.saleKind}
									extraUSD={extraUSD}
									extra={extra}
									endTime={Number(item.order.expirationTime)}
									listingTime={Number(item.order.listingTime)}
									orderSell={item.order}
								/>
							) : (
								<></>
							)}
						</Stack>
					</Fragment>
				)}

				{personalOffer && (
					<Typography variant="h6" sx={{ py: 0.5 }}>
						You are offering for: {personalOffer.offerPrice}{' '}
						{personalOffer.symbolToken?.toUpperCase()}
					</Typography>
				)}

				{/* EXECUTE BUTTONS */}
				<Stack
					direction="row"
					justifyContent="flex-start"
					alignItems="center"
					spacing={2}
					sx={{ height: '2.3rem', mt: 5 }}
				>
					<ButtonSell />

					<ButtonBuy />

					<ButtonOffer
						personalOffer={personalOffer}
						loadingPersonalOffer={loadingPersonalOffer}
					/>

					<ButtonCancelSelling refetchApi={refetchApi} />

					<ButtonCancelOffer
						loadingPersonalOffer={loadingPersonalOffer}
						personalOffer={personalOffer}
						refetchApi={refetchApi}
					/>
				</Stack>
			</>
		) : (
			<></>
		)
	) : (
		<SkeletonItemInfo />
	);
}
