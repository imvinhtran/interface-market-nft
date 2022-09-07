import React from 'react';
import { Skeleton } from '@mui/material';

export interface ISkeletonItemInfoProps {}

export default function SkeletonItemInfo(props: ISkeletonItemInfoProps) {
	return (
		<>
			<Skeleton width={100} />
			<Skeleton width={200} height={50} sx={{ mt: 2 }} />
			<Skeleton width={250} height={40} sx={{ mt: 3 }} />
			<Skeleton width={300} height={30} sx={{ mt: 3 }} />
			<Skeleton width={140} height={60} sx={{ mt: 4 }} />
		</>
	);
}
