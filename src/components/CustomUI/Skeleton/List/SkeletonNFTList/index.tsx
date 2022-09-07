import React from 'react';
import SkeletonNFTItemCard from '../../Item/SkeletonNFTItem';

type SkeletonListProps = {
	amount?: number;
};

export default function SkeletonNftList({ amount }: SkeletonListProps) {
	return (
		<>
			{new Array(amount ? amount : 20).fill(null).map((item, idx) => {
				return <SkeletonNFTItemCard key={idx} />;
			})}
		</>
	);
}
