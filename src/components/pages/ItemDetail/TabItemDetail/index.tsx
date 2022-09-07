/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy } from 'react';
//components
import Loadable from 'components/CustomUI/LoadableComponent';
// images
import iconAssetWhite from 'assets/icons/asset-white.webp';
import iconDescriptionWhite from 'assets/icons/description-white.webp';
import iconOfferWhite from 'assets/icons/offer-white.webp';
import iconGraphWhite from 'assets/icons/graph-white.webp';

import iconAssetBlack from 'assets/icons/asset-black.webp';
import iconDescriptionBlack from 'assets/icons/description-black.webp';
import iconOfferBlack from 'assets/icons/offer-black.webp';
import iconGraphBlack from 'assets/icons/graph-black.webp';

import iconAssetBlue from 'assets/icons/asset-blue.webp';
import iconDescriptionBlue from 'assets/icons/description-blue.webp';
import iconOfferBlue from 'assets/icons/offer-blue.webp';
import iconGraphBlue from 'assets/icons/graph-blue.webp';
// models
import { NFT, PriceActivity, OrderResponseAPI } from 'models';
// mui
import { useTheme } from '@mui/material';

const ItemInfoTab = Loadable(lazy(() => import('../Tabs/ItemInfoTab')));
const DescriptionTab = Loadable(lazy(() => import('../Tabs/DescriptionTab')));
const OfferTab = Loadable(lazy(() => import('../Tabs/OfferTab')));
const GraphTab = Loadable(lazy(() => import('../Tabs/GraphTab')));
const TabForbitNFTs = Loadable(lazy(() => import('../../../CustomUI/TabForbitNFTs')));

export interface ITabItemDetailProps {
	// props for ItemInfoTab
	item: NFT | null;
	personalOffer: OrderResponseAPI | null;
	loadingPersonalOffer: boolean;
	refetchApi: VoidFunction;
	// props for GraphTab
	listActivityPriceChart: PriceActivity[];
}

function TabItemDetail({
	// props for ItemInfoTab
	item,
	personalOffer,
	loadingPersonalOffer,
	refetchApi,
	// props for GraphTab
	listActivityPriceChart,
}: ITabItemDetailProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	const tabsDetail = {
		items: [
			{
				id: 'tab-1',
				name: 'tab-effect-3',
				defaultChecked: 'checked',
				title: 'Item',
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
				title: 'Detail',
				icon: isLightTheme ? (
					<img src={iconDescriptionBlack} alt="description icon" width={20} height={16} />
				) : (
					<img src={iconDescriptionWhite} alt="description icon" width={20} height={16} />
				),
				iconSelected: (
					<img src={iconDescriptionBlue} alt="description icon" width={20} height={16} />
				),
				isShow: true,
			},
			{
				id: 'tab-3',
				name: 'tab-effect-3',
				defaultChecked: '',
				title: 'Offer',
				icon: isLightTheme ? (
					<img src={iconOfferBlack} alt="offer icon" width={20} height={20} />
				) : (
					<img src={iconOfferWhite} alt="offer icon" width={20} height={20} />
				),
				iconSelected: <img src={iconOfferBlue} alt="offer icon" width={20} height={20} />,
				isShow: true,
			},
			{
				id: 'tab-4',
				name: 'tab-effect-3',
				defaultChecked: '',
				title: 'Graph',
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
				Section: (
					<ItemInfoTab
						item={item}
						personalOffer={personalOffer}
						loadingPersonalOffer={loadingPersonalOffer}
						refetchApi={refetchApi}
					/>
				),
				isShow: true,
			},
			{ id: 'tab-item-2', Section: <DescriptionTab />, isShow: true },
			{
				id: 'tab-item-3',
				Section: <OfferTab />,
				isShow: true,
			},
			{
				id: 'tab-item-4',
				Section: <GraphTab listActivityPriceChart={listActivityPriceChart} />,
				isShow: true,
			},
		],
	};
	return <TabForbitNFTs tabItems={tabsDetail.items} tabSections={tabsDetail.sections} />;
}

export default React.memo(TabItemDetail);
