// models
import { Collection } from 'models';
import React from 'react';
import { useNavigate } from 'react-router-dom';
// utils
import { compressImage, formatNumber, sliceString } from 'utils';
// styled
import {
	CollectionAvatar,
	CollectionInfo,
	CollectionItem,
	CollectionRank,
	NameInfo,
	TotalInfo,
} from './styled';

export interface ICollectionRankingCardProps {
	collection: Collection;
	rank: number;
	filter: string;
}

export default function CollectionRankingCard({
	collection,
	rank,
	filter,
}: ICollectionRankingCardProps) {
	const navigate = useNavigate();
	const getVolumeTrade = (type: string, collection: Collection) => {
		if (type === '1 day') {
			return formatNumber(collection.volume24Hour?.toString()!, 2);
		} else if (type === '7 days') {
			return formatNumber(collection.volume7Days?.toString()!, 2);
		} else return formatNumber(collection.volume30Days?.toString()!, 2);
	};

	return collection ? (
		<CollectionItem
			direction="row"
			alignItems="center"
			onClick={() => {
				navigate(`/collections/view/${collection.collectionId}`);
			}}
		>
			<CollectionRank>{rank + 1}</CollectionRank>
			<CollectionAvatar src={compressImage(collection.logo, 100, 'best')} alt="avatar" />
			<CollectionInfo>
				<NameInfo variant="body1" noWrap>
					{sliceString(collection.collectionName, 15)}
				</NameInfo>
				{collection.volumeTrade !== 0 && (
					<TotalInfo variant="body2">$ {getVolumeTrade(filter, collection)}</TotalInfo>
				)}
			</CollectionInfo>
		</CollectionItem>
	) : (
		<></>
	);
}
