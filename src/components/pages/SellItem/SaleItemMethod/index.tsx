import React from 'react';
//mui
import { Stack, Typography, useTheme } from '@mui/material';
//styled
import { SellMethodBox, SellMethodWrapper } from './styled';
//image
import TagWhite from 'assets/icons/tag-white.webp';
import TicketWhite from 'assets/icons/ticket-white.webp';

import TagBlack from 'assets/icons/tag-black.webp';
import TicketBlack from 'assets/icons/ticket-black.webp';
//context
import { useSelling } from 'contexts/SellingContext';
//constant
import { ORDER_CONFIGURATION } from '../../../../constants';

function SellItemMethod() {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';
	//context
	const context = useSelling();
	const { state, dispatch } = context;
	const { saleKind } = state;

	//Sale kind
	const FIXED = ORDER_CONFIGURATION.FIXED_PRICE;
	const DUTCH = ORDER_CONFIGURATION.DUTCH_AUCTION;

	//set selling saleKind
	const handleChangeSellingMethod = (num: number) => {
		dispatch({ type: 'RESET_SELLING_STATE', value: null });
		dispatch({ type: 'SET_SALE_KIND', value: num });
	};

	return (
		<Stack
			direction={{ xs: 'row', lg: 'column' }}
			justifyContent="center"
			alignItems="center"
			spacing={3}
		>
			<SellMethodWrapper>
				<SellMethodBox
					active={saleKind === FIXED ? true : false}
					onClick={() => handleChangeSellingMethod(FIXED)}
				>
					<img
						src={isLightTheme ? TagBlack : TagWhite}
						alt="tag price"
						width={30}
						height={30}
					/>
					<Typography variant="h5">Fixed price</Typography>
				</SellMethodBox>
			</SellMethodWrapper>

			<SellMethodWrapper>
				<SellMethodBox
					active={saleKind === DUTCH ? true : false}
					onClick={() => handleChangeSellingMethod(DUTCH)}
				>
					<img
						src={isLightTheme ? TicketBlack : TicketWhite}
						alt="ticket"
						width={35}
						height={25}
					/>
					<Typography variant="h5">Falling Price</Typography>
				</SellMethodBox>
			</SellMethodWrapper>
		</Stack>
	);
}
export default SellItemMethod;
