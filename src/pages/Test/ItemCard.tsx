/* eslint-disable @typescript-eslint/no-unused-vars */
// mui
import { AvatarGroup, Box, Stack, Typography } from '@mui/material';
import { NFT } from 'models';
import * as React from 'react';
import {
	AvatarStyle,
	ItemCardStyle,
	ItemFooterContentStyle,
	ItemFooterStyle,
	ItemImageStyle,
	PriceChangeStyle,
	PriceStyle,
} from './styled';

export interface ItemCardProps {
	item: NFT;
}

export default function ItemCard({ item }: ItemCardProps) {
	return (
		<Box sx={{ position: 'relative' }}>
			<ItemCardStyle>
				<Box sx={{ pt: '100%', position: 'relative', m: 1 }}>
					<ItemImageStyle src={item.itemMedia} alt="item" />
				</Box>
				<Box sx={{ width: '100%', height: '100%', p: 2 }}>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						spacing={1}
					>
						<Box sx={{ width: '70%' }}>
							<Typography variant="h6" noWrap sx={{ fontWeight: '400' }}>
								{item.itemName}
							</Typography>
						</Box>
						<Typography
							variant="body2"
							noWrap
							sx={{
								opacity: '0.6',
								fontWeight: '600',
							}}
						>
							#1998
						</Typography>
					</Stack>

					<Stack
						direction="row"
						alignItems="flex-end"
						justifyContent="space-between"
						spacing={1}
						sx={{ paddingTop: '10px' }}
					>
						<PriceStyle variant="h4" noWrap>
							&gt; 0.001 ETH
						</PriceStyle>
						<PriceChangeStyle variant="caption" noWrap sx={{ opacity: '0.5' }}>
							(7,844,3 USDC)
						</PriceChangeStyle>
					</Stack>
				</Box>
				<ItemFooterStyle></ItemFooterStyle>
				<ItemFooterContentStyle>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={2}
						sx={{
							height: '100%',
							width: '100%',
							padding: '0 14px',
						}}
					>
						<AvatarGroup>
							<AvatarStyle alt="Remy Sharp" src="/NFT/1.png" />
							<AvatarStyle alt="Travis Howard" src="/NFT/2.png" />
							<AvatarStyle alt="Agnes Walker" src="/NFT/3.png" />
						</AvatarGroup>
					</Stack>
				</ItemFooterContentStyle>
			</ItemCardStyle>
		</Box>
	);
}
