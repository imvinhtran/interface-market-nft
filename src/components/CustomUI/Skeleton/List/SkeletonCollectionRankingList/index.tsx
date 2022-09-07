import { Grid } from '@mui/material';
import React from 'react';
import SkeletonCollectionRankingCard from '../../Item/SkeletonCollectionRankingCard';

export default function SkeletonCollectionRankingList() {
	return (
		<>
			{new Array(10).fill(null).map((item, idx) => {
				return (
					<Grid item xs={1} key={idx}>
						<SkeletonCollectionRankingCard />
					</Grid>
				);
			})}
		</>
	);
}
