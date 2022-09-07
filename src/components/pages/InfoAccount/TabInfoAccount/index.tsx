/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useLocation } from 'react-router-dom';
// mui
import { useTheme } from '@mui/material';
// components
import ActivityTab from '../Tabs/ActivityTab';
import FavoritesTab from '../Tabs/FavoritesTab';
import InWalletTab from '../Tabs/InWalletTab';
import OffersTab from '../Tabs/OffersTab';
import TabForbitNFTs from '../../../CustomUI/TabForbitNFTs';
// images
import iconAssetWhite from 'assets/icons/asset-white.webp';
import iconHistoryWhite from 'assets/icons/history-white.webp';
import iconBiddingWhite from 'assets/icons/bidding-white.webp';
import iconFavoriteWhite from 'assets/icons/favorite-white.webp';

import iconAssetBlack from 'assets/icons/asset-black.webp';
import iconHistoryBlack from 'assets/icons/history-black.webp';
import iconBiddingBlack from 'assets/icons/bidding-black.webp';
import iconFavoriteBlack from 'assets/icons/favorite-black.webp';

import iconAssetBlue from 'assets/icons/asset-blue.webp';
import iconHistoryBlue from 'assets/icons/history-blue.webp';
import iconBiddingBlue from 'assets/icons/bidding-blue.webp';
import iconFavoriteBlue from 'assets/icons/favorite-blue.webp';
// models
import { OptionSelectCustom } from 'models';

interface TabInfoAccountProps {
	// props for OffersTab
	currentFilterOfferOption: OptionSelectCustom;
	setCurrentFilterFilterOfferOption: Function;
	listFilterOfferOption: OptionSelectCustom[];
}

function TabInfoAccount({
	// props for OffersTab
	currentFilterOfferOption,
	setCurrentFilterFilterOfferOption,
	listFilterOfferOption,
}: TabInfoAccountProps) {
	const { pathname } = useLocation();
	const isMyAccount = pathname.includes('my');
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	const tabsDetail = {
		items: [
			{
				id: 'tab-1',
				name: 'tab-effect-3',
				defaultChecked: 'checked',
				title: 'My Assets',
				icon: isLightTheme ? (
					<img src={iconAssetBlack} alt="asset icon" width={20} height={20} />
				) : (
					<img src={iconAssetWhite} alt="asset icon" width={20} height={20} />
				),
				iconSelected: <img src={iconAssetBlue} alt="asset icon" width={20} height={20} />,
				isShow: true,
			},
			{
				id: 'tab-2',
				name: 'tab-effect-3',
				defaultChecked: '',
				title: 'History',
				icon: isLightTheme ? (
					<img src={iconHistoryBlack} alt="history icon" width={20} height={20} />
				) : (
					<img src={iconHistoryWhite} alt="history icon" width={20} height={20} />
				),
				iconSelected: (
					<img src={iconHistoryBlue} alt="history icon" width={20} height={20} />
				),
				isShow: true,
			},
			{
				id: 'tab-3',
				name: 'tab-effect-3',
				defaultChecked: '',
				title: 'Offer',
				icon: isLightTheme ? (
					<img src={iconBiddingBlack} alt="bidding icon" width={24} height={24} />
				) : (
					<img src={iconBiddingWhite} alt="bidding icon" width={24} height={24} />
				),
				iconSelected: (
					<img src={iconBiddingBlue} alt="bidding icon" width={24} height={24} />
				),
				isShow: isMyAccount,
			},
			{
				id: 'tab-4',
				name: 'tab-effect-3',
				defaultChecked: '',
				title: 'Favorites',
				icon: isLightTheme ? (
					<img src={iconFavoriteBlack} alt="favorite icon" width={22} height={20} />
				) : (
					<img src={iconFavoriteWhite} alt="favorite icon" width={22} height={20} />
				),
				iconSelected: (
					<img src={iconFavoriteBlue} alt="favorite icon" width={22} height={20} />
				),
				isShow: isMyAccount,
			},
		],
		sections: [
			{
				id: 'tab-item-1',
				Section: <InWalletTab />,
				isShow: true,
			},
			{ id: 'tab-item-2', Section: <ActivityTab />, isShow: true },
			{
				id: 'tab-item-3',
				Section: (
					<OffersTab
						currentFilterOfferOption={currentFilterOfferOption}
						setCurrentFilterFilterOfferOption={setCurrentFilterFilterOfferOption}
						listFilterOfferOption={listFilterOfferOption}
					/>
				),
				isShow: isMyAccount,
			},
			{ id: 'tab-item-4', Section: <FavoritesTab />, isShow: isMyAccount },
		],
	};
	return <TabForbitNFTs tabItems={tabsDetail.items} tabSections={tabsDetail.sections} />;
}

export default React.memo(TabInfoAccount);
