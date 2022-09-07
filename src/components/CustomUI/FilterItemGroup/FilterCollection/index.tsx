/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
// mui
import { Stack, useTheme } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
// components
import DropDown from '../Common/DropDown';
import DividerGradient from 'components/CustomUI/DividerGradient';
import FieldInput from 'components/CustomField/FieldInput';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { selectLoading, resetAll as resetAllState } from 'redux/slices/collectionSlice';
// actions
import { fetchAllCollection } from 'redux/actions/collectionAction';
// styled
import {
	ButtonApply,
	ButtonBadge,
	ButtonClear,
	ButtonStyled,
	ButtonTitle,
	ButtonWrapper,
	CheckIconWrapper,
	DropdownButtonGroup,
	DropdownWrapper,
	IconStyled,
	ListOption,
	OptionItem,
	OptionItemImage,
	OptionItemText,
} from '../Common/styled';
// images
import iconCollectionWhite from 'assets/icons/filter-collection-white.webp';
import iconCollectionBlack from 'assets/icons/filter-collection-black.webp';
// models
import { Collection, FilterNft } from 'models';
// apis
import collectionApi from 'apis/collectionApi';
import { sliceString } from 'utils';
// styled
import { CollectionImage } from './styled';

interface Selected {
	collectionId: string;
	collectionName: string;
}

const defaultButtonTitle = 'Collection';

export interface IFilterCollectionProps {
	filter: FilterNft;
	setFilter: Function;
	resetAll: boolean;
}

export default function FilterCollection({ filter, setFilter, resetAll }: IFilterCollectionProps) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const typingTimeoutRef = useRef<any>(null);
	let mounted: boolean = false;
	const chainId = filter.chainId;
	const isLightTheme = theme.palette.mode === 'light';

	// useState
	const [activeDropDown, setActiveDropDown] = useState<boolean>(false);
	const [selected, setSelected] = useState<Selected[]>([]);
	const [collectionName, setCollectionName] = useState<string>('');
	const [triggerFilter, setTriggerFilter] = useState<boolean>(false);
	const [listCollectionTemp, setListCollectionTemp] = useState<Collection[]>([]);
	const [buttonTitle, setButtonTitle] = useState<string>(defaultButtonTitle);

	// useSelector
	const isLoading = useSelector(selectLoading);

	// useEffect
	useEffect(() => {
		return () => {
			dispatch(resetAllState());
		};
	}, []);

	useEffect(() => {
		if (resetAll) {
			handleClear();
			setButtonTitle(defaultButtonTitle);
		}
	}, [resetAll]);

	// fetch list collection
	useEffect(() => {
		mounted = true;

		dispatch(
			fetchAllCollection(
				{ pageSize: 20, page: 1 },
				{ collectionName, chainId },
				true,
				executeAfterFetchListCollection
			)
		);

		return () => {
			mounted = false;
		};
	}, [dispatch, triggerFilter, chainId]);

	const executeAfterFetchListCollection = async (globalStateNewest: RootState) => {
		const { collection } = globalStateNewest;
		if (!collection.isSuccess) {
			toast.error(
				'Some error occur when getting your collections!' + collection.errorMessage
			);
		} else {
			if (collection.listCollections.length <= 0) {
				if (mounted) setListCollectionTemp([]);
			} else {
				try {
					const list = await Promise.all(
						collection.listCollections.map(async (item: any, idx: number) => {
							const res: Collection = await collectionApi.getCollectionById(item._id);
							return res;
						})
					);

					if (mounted) setListCollectionTemp(list);
				} catch (error) {
					toast.error('Some error occur when getting your collections!');
				}
			}

			mounted = false;
		}
	};

	// functions
	const handleFilterByName = (e: any) => {
		const value = e.target.value;
		setCollectionName(value);

		if (typingTimeoutRef) {
			clearTimeout(typingTimeoutRef.current);
		}
		typingTimeoutRef.current = setTimeout(() => {
			// do something
			setTriggerFilter(!triggerFilter);
		}, 500);
	};

	const handleClickOption = (id: string, name: string) => {
		const selectedCollection: Selected | undefined = selected.find(
			(item: Selected) => item.collectionId === id
		);

		if (!selectedCollection) {
			// option is not selected => select
			const newSelectedItem: Selected = { collectionId: id, collectionName: name };
			setSelected([...selected, newSelectedItem]);
		} else {
			// option is selected => remove
			setSelected(selected.filter((item: Selected) => item.collectionId !== id));
		}
	};

	const handleClear = () => {
		setSelected([]);
		setCollectionName('');
		setButtonTitle(defaultButtonTitle);
	};

	const handleApply = () => {
		let arrCollectionId: string[] = [];
		let arrCollectionName: string[] = [];

		selected.forEach((item: Selected) => {
			arrCollectionId.push(item.collectionId);
			arrCollectionName.push(item.collectionName);
		});

		if (arrCollectionName.length === 0) {
			setButtonTitle(defaultButtonTitle);
		} else {
			setButtonTitle(arrCollectionName.join(', '));
		}

		const newFilter: FilterNft = { ...filter, collectionId: arrCollectionId };
		dispatch(setFilter(newFilter));
	};

	const renderButtonContent = () => {
		return (
			<ButtonWrapper>
				{buttonTitle !== defaultButtonTitle && (
					<ButtonBadge>{defaultButtonTitle}</ButtonBadge>
				)}

				<ButtonStyled>
					<IconStyled sx={{ width: '14px', height: '14px' }}>
						{isLightTheme ? (
							<img src={iconCollectionBlack} alt="icon collection" />
						) : (
							<img src={iconCollectionWhite} alt="icon collection" />
						)}
					</IconStyled>
					<ButtonTitle>{buttonTitle}</ButtonTitle>
				</ButtonStyled>
			</ButtonWrapper>
		);
	};

	const renderDropdownContent = () => {
		return (
			<DropdownWrapper sx={{ minWidth: '300px' }}>
				<FieldInput
					type="text"
					value={collectionName}
					onChange={handleFilterByName}
					placeholder="Search name ..."
					sx={{
						padding: '12px 15px',
					}}
				/>

				<ListOption sx={{ mt: 0.5 }}>
					{listCollectionTemp.map((item: Collection, idx: number) => {
						const isItemSelected =
							selected.find(
								(itemSelected: Selected) =>
									itemSelected.collectionId === item.collectionId
							) !== undefined;

						return (
							<OptionItem
								key={idx}
								onClick={() => {
									handleClickOption(item.collectionId, item.collectionName);
								}}
							>
								<Stack direction="row" alignItems="center">
									<CollectionImage sx={{ width: '32px', height: '32px' }}>
										<img src={item.logo} alt="collection logo" />
									</CollectionImage>
									<OptionItemText>
										{sliceString(item.collectionName, 22)}
									</OptionItemText>
								</Stack>

								{isItemSelected && (
									<CheckIconWrapper>
										<CheckIcon sx={{ width: '100%', height: '100%' }} />
									</CheckIconWrapper>
								)}
							</OptionItem>
						);
					})}
				</ListOption>

				<DividerGradient />

				<DropdownButtonGroup>
					<ButtonClear onClick={handleClear}>Clear</ButtonClear>
					<ButtonApply onClick={handleApply}>Apply</ButtonApply>
				</DropdownButtonGroup>
			</DropdownWrapper>
		);
	};

	return (
		<DropDown
			activeDropDown={activeDropDown}
			setActiveDropDown={setActiveDropDown}
			buttonContent={renderButtonContent()}
			dropdownContent={renderDropdownContent()}
		/>
	);
}
