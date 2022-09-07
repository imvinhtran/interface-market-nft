import * as React from 'react';
//model
import { NFT } from 'models';
//components
import NoItemCircleCard from '../Card/NoItemCard/NoItemCircleCard';
import { Box, Grid } from '@mui/material';
import NFTItem from 'components/CustomUI/Card/NFTItem';
// images
import ImageNoOffer from 'assets/icons/no-offers.webp';

export interface ListItemProductProps {
	listNFTs: NFT[];
}

export default function ListItemProduct({ listNFTs }: ListItemProductProps) {
	return (
		<>
			{listNFTs?.length > 0 ? (
				listNFTs.map((item, idx) => {
					return (
						<Grid item xs={1} key={idx}>
							<NFTItem key={idx} itemId={item} />
						</Grid>
					);
				})
			) : (
				<Box sx={{ mt: 5, width: '100%' }}>
					<NoItemCircleCard title="No items yet!" image={ImageNoOffer} />
				</Box>
			)}
		</>
	);
}
