/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useRef } from 'react';
// components
import NoItemCircleCard from 'components/CustomUI/Card/NoItemCard/NoItemCircleCard';
import FieldInput from 'components/CustomField/FieldInput';
import SkeletonOfferInItemDetailList from 'components/CustomUI/Skeleton/List/SkeletonOfferInItemDetailList';
import OfferInItemDetailCard from 'components/CustomUI/Card/OfferInItemDetailCard';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectListTokenPayment } from 'redux/slices/tokenPaymentSlice';
import {
	selectListOrderOffer,
	selectLoading,
	selectFilter,
	setFilter,
} from 'redux/slices/orderSlice';
// modals
import { OrderResponseAPI, TokenPayment } from 'models';
// mui
import { Box, Stack } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// styled
import { FilterBox, OfferList } from './styled';
// images
import ImageNoOffer from 'assets/icons/no-offers.webp';

export interface IOfferTabProps {}

function OfferTab(props: IOfferTabProps) {
	const dispatch = useDispatch();
	const typingTimeoutRef = useRef<any>(null);
	const parentRef = useRef<any>(null);

	// useState
	const [listWidth, setListWidth] = useState<number>(500);
	const [isAsc, setIsAsc] = useState<0 | 1>(0);

	// useSelector
	const listOrderOffer: OrderResponseAPI[] = useSelector(selectListOrderOffer);
	const isLoading = useSelector(selectLoading);
	const filter = useSelector(selectFilter);
	const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);

	// useEffect
	useEffect(() => {
		// Handler to call on window resize
		function getListSize() {
			const newWidth = parentRef.current?.offsetWidth;
			setListWidth(newWidth - 120);
		}
		// Add event listener
		window.addEventListener('resize', getListSize, { passive: true });
		// Call handler right away so state gets updated with initial window size
		getListSize();
		// Remove event listener on cleanup
		return () => {
			window.removeEventListener('resize', getListSize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch(setFilter({ ...filter, asc: isAsc }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, isAsc]);

	// functions
	const handleFilterByUserAddress = (e: any) => {
		const value = e.target.value;
		if (typingTimeoutRef) {
			clearTimeout(typingTimeoutRef.current);
		}
		typingTimeoutRef.current = setTimeout(() => {
			dispatch(setFilter({ ...filter, maker: value }));
		}, 500);
	};

	const handleChangeSortKind = () => {
		setIsAsc(isAsc ? 0 : 1);
	};

	return (
		<Box sx={{ width: '100%', height: '100%' }} ref={parentRef}>
			<Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
				<Box sx={{ flexGrow: 1 }}>
					<FieldInput
						type="text"
						onChange={handleFilterByUserAddress}
						placeholder="Search by address ..."
					/>
				</Box>

				<FilterBox onClick={handleChangeSortKind}>
					<ArrowUpwardIcon
						sx={{
							mx: 1,
							transform: !isAsc ? 'rotate(180deg)' : 'unset',
							transition: 'all 0.4s',
						}}
					/>
				</FilterBox>
			</Stack>

			<Box sx={{ marginTop: '1rem', paddingBottom: '1rem' }}>
				{!isLoading ? (
					<OfferList listheight={listWidth}>
						{listOrderOffer && listOrderOffer.length > 0 ? (
							listOrderOffer.map((item: any, index: number) => (
								<Box sx={{ mb: 1 }} key={index}>
									<OfferInItemDetailCard orderId={item._id} />
								</Box>
							))
						) : (
							<Box sx={{ mt: 2, p: 1 }}>
								<NoItemCircleCard title="No offer yet!" image={ImageNoOffer} />
							</Box>
						)}
					</OfferList>
				) : (
					<SkeletonOfferInItemDetailList />
				)}
			</Box>
		</Box>
	);
}

export default OfferTab;
