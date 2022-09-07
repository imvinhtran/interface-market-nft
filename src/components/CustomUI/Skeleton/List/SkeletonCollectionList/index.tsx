import { Grid } from '@mui/material';
import React from 'react';
import SkeletonCollectionCard from '../../Item/SkeletonCollectionCard';

export default function SkeletonCollectionList() {
	return (
		<>
			{new Array(6).fill(null).map((item, idx) => {
				return (
					<Grid item xs={1} key={idx}>
						<SkeletonCollectionCard />
					</Grid>
				);
			})}
		</>
	);
}
