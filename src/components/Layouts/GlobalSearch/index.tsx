/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
// mui
import { Box, Typography } from '@mui/material';
// styled
import { Divider } from './Common/styled';
import { ResultTitle, GlobalSearchComponent } from './styled';
// components
import GlobalSearchResultCard from 'components/CustomUI/Card/GlobalSearchResultCard';
import SkeletonGlobalResultList from 'components/CustomUI/Skeleton/List/SkeletonGlobalResultList';
// apis
import nftsApi from 'apis/nftsApi';
import collectionApi from 'apis/collectionApi';
import userApi from 'apis/userApi';
// contexts
import { SizeContext } from 'contexts/SizeObserver';
// utils
import GlobalSearchSmallScreen from './GlobalSearchSmallScreen';
import GlobalSearchBigScreen from './GlobalSearchBigScreen';

const GlobalSearch: React.FC = () => {
	const typingTimeoutRef = useRef<any>(null);

	//useContext
	const { innerWidth } = useContext(SizeContext);

	// useState
	const [inputValue, setInputValue] = useState<string>('');
	const [triggerSearch, setTriggerSearch] = useState<boolean>(false);

	const [isLoadingCollection, setIsLoadingCollection] = useState<boolean>(false);
	const [isLoadingItem, setIsLoadingItem] = useState<boolean>(false);
	const [isLoadingUser, setIsLoadingUser] = useState<boolean>(false);

	const [listCollectionId, setListCollectionId] = useState<any>([]);
	const [listItemId, setListItemId] = useState<any>([]);
	const [listUserId, setListUserId] = useState<any>([]);

	// vars
	const globalSearchBreakpoint = 1050;

	// useEffect
	// fetch list collection id
	useEffect(() => {
		if (inputValue) {
			(async () => {
				setIsLoadingCollection(true);
				try {
					const res = await collectionApi.getSearchListCollectionId(
						{ page: 1, pageSize: 3 },
						{ text: inputValue }
					);
					setListCollectionId(res.data);
					setIsLoadingCollection(false);
				} catch (error) {
					toast.error('Some error occurred while searching collection!');
					setIsLoadingCollection(false);
				}
			})();
		} else {
			setListCollectionId([]);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [triggerSearch]);

	// fetch list item id
	useEffect(() => {
		if (inputValue) {
			(async () => {
				setIsLoadingItem(true);
				try {
					const res = await nftsApi.getSearchListTokenId(
						{ page: 1, pageSize: 3 },
						{ text: inputValue }
					);
					setListItemId(res.data);
					setIsLoadingItem(false);
				} catch (error) {
					toast.error('Some error occurred while searching item!');
					setIsLoadingItem(false);
				}
			})();
		} else {
			setListItemId([]);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [triggerSearch]);

	// fetch list user id
	useEffect(() => {
		if (inputValue) {
			(async () => {
				setIsLoadingUser(true);
				try {
					const res = await userApi.getListUserById(
						{ page: 1, pageSize: 3 },
						{ text: inputValue }
					);
					setListUserId(res.data);
					setIsLoadingUser(false);
				} catch (error) {
					toast.error('Some error occurred while searching user!');
					setIsLoadingUser(false);
				}
			})();
		} else {
			setListUserId([]);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [triggerSearch]);

	// functions
	const handleOnChangeInputValue = (e: any) => {
		const newValue = e.target.value;
		setInputValue(newValue);

		if (typingTimeoutRef) {
			clearTimeout(typingTimeoutRef.current);
		}
		typingTimeoutRef.current = setTimeout(() => {
			// do something
			setTriggerSearch(!triggerSearch);
		}, 500);
	};

	const RenderSearchResults = (deactivateDropdown: Function) => {
		return (
			<Box>
				<ResultTitle variant="body1">Collection</ResultTitle>

				{!isLoadingCollection ? (
					listCollectionId.length > 0 ? (
						<>
							{listCollectionId.map((item: any, index: number) => {
								return (
									<Box key={index}>
										<Divider />
										<GlobalSearchResultCard
											resultId={item._id}
											type="collection"
											deactivateDropdown={deactivateDropdown}
										/>
									</Box>
								);
							})}
						</>
					) : (
						<Typography variant="body2" sx={{ pl: 1, pb: 1 }}>
							No result
						</Typography>
					)
				) : (
					<SkeletonGlobalResultList />
				)}

				<Divider />
				<ResultTitle variant="body1">Item</ResultTitle>
				{!isLoadingItem ? (
					listItemId.length > 0 ? (
						<>
							{listItemId.map((item: any, index: number) => {
								return (
									<Box key={index}>
										<Divider />
										<GlobalSearchResultCard
											resultId={item._id}
											type="item"
											deactivateDropdown={deactivateDropdown}
										/>
									</Box>
								);
							})}
						</>
					) : (
						<Typography variant="body2" sx={{ pl: 1, pb: 1 }}>
							No result
						</Typography>
					)
				) : (
					<SkeletonGlobalResultList />
				)}

				<Divider />
				<ResultTitle variant="body1">Account</ResultTitle>
				{!isLoadingUser ? (
					listUserId.length > 0 ? (
						<>
							{listUserId.map((item: any, index: number) => {
								return (
									<Box key={index}>
										<Divider />
										<GlobalSearchResultCard
											resultId={item._id}
											type="user"
											deactivateDropdown={deactivateDropdown}
										/>
									</Box>
								);
							})}
						</>
					) : (
						<Typography variant="body2" sx={{ pl: 1, pb: 1 }}>
							No result
						</Typography>
					)
				) : (
					<SkeletonGlobalResultList />
				)}
			</Box>
		);
	};

	return (
		<GlobalSearchComponent>
			{innerWidth <= globalSearchBreakpoint && (
				<GlobalSearchSmallScreen
					inputValue={inputValue}
					handleOnChangeInputValue={handleOnChangeInputValue}
					RenderSearchResults={RenderSearchResults}
				/>
			)}
			{innerWidth > globalSearchBreakpoint && (
				<GlobalSearchBigScreen
					inputValue={inputValue}
					setInputValue={setInputValue}
					handleOnChangeInputValue={handleOnChangeInputValue}
					RenderSearchResults={RenderSearchResults}
				/>
			)}
		</GlobalSearchComponent>
	);
};

export default React.memo(GlobalSearch);
