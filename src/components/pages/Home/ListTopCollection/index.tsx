/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// redux state
import { useSelector, useDispatch } from 'react-redux';
import { selectChainId } from 'redux/slices/web3InfoSlice';
import { setLoading } from 'redux/slices/loadingSlice';
import {
	selectFilter,
	selectListTopCollection,
	selectLoading,
} from 'redux/slices/listTopCollectionSlice';
// actions
import { fetchListTopCollection } from 'redux/actions/listTopCollectionAction';
// component
import TextGradient from 'components/CustomUI/TextGradient';
import CommonListCollection from '../CommonListCollection';
import { Collection, ListResponse } from 'models';
import DropDown from 'components/CustomUI/FilterItemGroup/Common/DropDown';
import LoadingPage from 'components/CustomUI/LoadingPage';
// api
import collectionApi from 'apis/collectionApi';
import { Box, Typography, Stack } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CheckIcon from '@mui/icons-material/Check';
//styled
import { FilterContent, FilterTrendingCollection } from './styled';
import {
	DropdownWrapper,
	ListOption,
	OptionItem,
	OptionItemText,
	CheckIconWrapper,
} from 'components/CustomUI/FilterItemGroup/Common/styled';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import { useNavigate } from 'react-router-dom';
import { ButtonViewAll, HeaderSection, MainHeader, SubHeader } from 'pages/Home/styled';

type FilterProps = {
	name: string;
	value: string;
};

const listFilter: FilterProps[] = [
	{ name: '1 day', value: 'volume24Hours' },
	{ name: '7 days', value: 'volume7Days' },
	{ name: '30 days', value: 'volume30Days' },
];

interface ListTopCollectionProps {
	renderSection: boolean;
	setRenderSection: Function;
}

function ListTopCollection({ renderSection, setRenderSection }: ListTopCollectionProps) {
	// console.log('render ListTopCollection()');
	const dispatch = useDispatch();
	const navigate = useNavigate();

	// const [listCollection, setListCollection] = useState<Collection[]>([]);
	// const [list24Hours, setList24Hours] = useState<Collection[]>([]);
	// const [list7Days, setList7Days] = useState<Collection[]>([]);
	// const [list30Days, setList30Days] = useState<Collection[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	// const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [selectedFilter, setSelectedFilter] = useState<string>('7 days');
	// const [sortBy, setSortBy] = useState<string>('volume7Days');
	const [list, setList] = useState<{
		list24Hours: Collection[];
		list7Days: Collection[];
		list30Days: Collection[];
	}>({ list24Hours: [], list7Days: [], list30Days: [] });
	const [refresh, setRefresh] = useState<boolean>(false);
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	//selector
	// const listTopCollectionTemp = listCollection.map((item: Collection) => {
	// 	return { _id: item.collectionId };
	// });

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				let volume24Hours: ListResponse<Collection>;
				let volume7Days: ListResponse<Collection>;
				let volume30Days: ListResponse<Collection>;
				// await Promise.all([
				// (volume24Hours = await collectionApi.getListTopCollection(
				// 	{ pageSize: 10, page: 1 },
				// 	{ sortBy: 'volume24Hours' }
				// )),
				volume7Days = await collectionApi.getListTopCollection(
					{ pageSize: 10, page: 1 },
					{ sortBy: 'volume7Days' }
				);
				// (volume30Days = await collectionApi.getListTopCollection(
				// 	{ pageSize: 10, page: 1 },
				// 	{ sortBy: 'volume30Days' }
				// )),
				// ]);
				setList({
					list24Hours: [],
					list7Days: volume7Days.data,
					list30Days: [],
				});
				// setList24Hours(volume24Hours.data);
				// setList7Days(volume7Days.data);
				// setList30Days(volume30Days.data);
				setIsLoading(false);
				setRenderSection(!renderSection);
				setIsSuccess(true);
			} catch (error: any) {
				setRenderSection(!renderSection);
				setIsLoading(false);
				setIsSuccess(false);
				toast.error(error.message);
			}
		})();
		// dispatch(fetchListTopCollection({ pageSize: 10, page: 1 }));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [refresh]);

	// const renderButtonContent = () => (
	// 	<FilterTrendingCollection variant="h5">
	// 		{selectedFilter} <KeyboardArrowDownIcon />
	// 	</FilterTrendingCollection>
	// );

	// const handleClickOption = (filter: FilterProps) => {
	// 	setSelectedFilter(filter.name);
	// 	setSortBy(filter.value);
	// 	setActiveDropDown(false);
	// };

	// const renderDropdownContent = () => (
	// 	<DropdownWrapper sx={{ width: '180px' }}>
	// 		<ListOption>
	// 			{listFilter.map((filter: FilterProps, index: number) => {
	// 				const isItemSelected = selectedFilter === filter.name;
	// 				return (
	// 					<OptionItem key={index} onClick={() => handleClickOption(filter)}>
	// 						<OptionItemText>{filter.name}</OptionItemText>

	// 						{isItemSelected && (
	// 							<CheckIconWrapper>
	// 								<CheckIcon sx={{ width: '100%', height: '100%' }} />
	// 							</CheckIconWrapper>
	// 						)}
	// 					</OptionItem>
	// 				);
	// 			})}
	// 		</ListOption>
	// 	</DropdownWrapper>
	// );

	return (
		<Fragment>
			{/* {isLoading && <LoadingPage />} */}
			{/* <Stack justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
				<Typography variant="h2" sx={{ textAlign: 'center' }}>
					Trending Collections
				</Typography>
				<FilterContent>
					<Typography variant="h5" sx={{ opacity: 0.5 }}>
						Top collection volume trade
					</Typography>
					<DropDown
						activeDropDown={activeDropDown}
						setActiveDropDown={setActiveDropDown}
						buttonContent={renderButtonContent()}
						dropdownContent={renderDropdownContent()}
					/>
				</FilterContent>
			</Stack>
			<Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', mt: 3 }}>
				<ButtonGradient
					sx={{ width: 200 }}
					onClick={() => navigate('/trending-collections')}
				>
					Go to Ranking
				</ButtonGradient>
			</Box> */}
			<HeaderSection>
				<MainHeader variant="h2">Trending Collections</MainHeader>
				<SubHeader variant="h5" sx={{ display: 'inline' }}>
					Top collection volume trade
					<ButtonViewAll
						sx={{ display: 'inline' }}
						onClick={() => {
							navigate('/trending-collections');
						}}
					>
						Ranking
					</ButtonViewAll>
				</SubHeader>
			</HeaderSection>

			<Box sx={{ m: '2rem 0' }}>
				<CommonListCollection
					listCollection={
						selectedFilter === '7 days'
							? list.list7Days
							: selectedFilter === '30 days'
							? list.list30Days
							: list.list24Hours
					}
					isLoading={isLoading}
					filter={selectedFilter}
					isSuccess={isSuccess}
					setRefresh={() => setRefresh(!refresh)}
				/>
			</Box>
		</Fragment>
	);
}

export default React.memo(ListTopCollection);
