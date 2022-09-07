/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy } from 'react';
import Loadable from 'components/CustomUI/LoadableComponent';
// mui
import { useTheme } from '@mui/material';
// images
import iconAssetWhite from 'assets/icons/asset-white.webp';
import iconHistoryWhite from 'assets/icons/history-white.webp';
import iconGraphWhite from 'assets/icons/graph-white.webp';

import iconAssetBlack from 'assets/icons/asset-black.webp';
import iconHistoryBlack from 'assets/icons/history-black.webp';
import iconGraphBlack from 'assets/icons/graph-black.webp';

import iconAssetBlue from 'assets/icons/asset-blue.webp';
import iconHistoryBlue from 'assets/icons/history-blue.webp';
import iconGraphBlue from 'assets/icons/graph-blue.webp';

const TabForbitNFTs = Loadable(lazy(() => import('components/CustomUI/TabForbitNFTs')));
const InWalletTab = Loadable(lazy(() => import('../Tabs/InWalletTab')));
const ActivityTab = Loadable(lazy(() => import('../Tabs/ActivityTab')));
const StatisticTab = Loadable(lazy(() => import('../Tabs/StatisticTab')));

function TabDetailCollection() {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	const tabsDetail = {
		items: [
			{
				id: 'tab-1',
				name: 'tab-effect-3',
				defaultChecked: 'checked',
				title: 'Items',
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
				title: 'Activity',
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
				title: 'Statistic',
				icon: isLightTheme ? (
					<img src={iconGraphBlack} alt="graph icon" width={32} height={15} />
				) : (
					<img src={iconGraphWhite} alt="graph icon" width={32} height={15} />
				),
				iconSelected: <img src={iconGraphBlue} alt="graph icon" width={32} height={15} />,
				isShow: true,
			},
		],
		sections: [
			{
				id: 'tab-item-1',
				Section: <InWalletTab />,
				isShow: true,
			},
			{ id: 'tab-item-2', Section: <ActivityTab />, isShow: true },
			{ id: 'tab-item-3', Section: <StatisticTab />, isShow: true },
		],
	};

	return <TabForbitNFTs tabItems={tabsDetail.items} tabSections={tabsDetail.sections} />;
}

export default React.memo(TabDetailCollection);
