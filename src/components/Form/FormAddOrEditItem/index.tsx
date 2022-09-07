/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// react-hook-form
import { Resolver, SubmitHandler, useForm } from 'react-hook-form';
// yup
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// model
import { Collection, CustomFile, NFT, OptionSelectCustom, User } from 'models';
// styled
import {
	FieldSubTitle,
	FieldTitleName,
	LogoBox,
	PageTitle,
	ErrorMessage,
	InputGroup,
	FieldIcon,
	Asterisk,
	PreviewItemContainer,
	PreviewItemWrapper,
} from './styled';
// components
import { Box, CircularProgress, Stack, Typography, useTheme } from '@mui/material';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import FieldInput from 'components/CustomField/FieldInput';
import ImageCustomInput from 'components/CustomField/ImageCustomInput';
import SwitchButton from 'components/CustomField/SwitchButton';
import AutoCompleteCustom2 from 'components/CustomField/AutoCompleteCustom2';
import PreviewItem from 'components/CustomUI/PreviewItem';
// redux
import { useSelector } from 'react-redux';
import { selectListCollection } from 'redux/slices/collectionSlice';
import { current } from '@reduxjs/toolkit';
import UploadMediaCustom from 'components/CustomField/UploadMediaCustom';
//utils
import { getFileType } from 'utils';

export interface FormAddOrEditItemProps {
	isEdit: boolean;
	currentItem?: NFT | null | undefined;
	listCollectionTemp: Collection[];
	handleChangeFreezeOption: (value: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: SubmitHandler<IFormAddOrEditItemInputs>;
}

export interface IFormAddOrEditItemInputs {
	itemMedia: string;
	itemThumbnail: string;
	itemName: string;
	description: string;
	collectionId: string;
	// userAddress: string; //must have
	// chainId: number; //must have
}

function FormAddOrEditItem({
	isEdit,
	currentItem,
	listCollectionTemp,
	handleChangeFreezeOption,
	onSubmit,
}: FormAddOrEditItemProps) {
	const { collectionId } = useParams();
	const theme = useTheme();
	// useState
	const [media, setMedia] = useState<CustomFile | string | null>(null);
	const [thumbnail, setThumbnail] = useState<CustomFile | string | null>(null);
	const [name, setName] = useState<string>('');
	// vars
	const isLightTheme = theme.palette.mode === 'light';

	const [currentCollectionTransformed, setCurrentCollectionTransformed] =
		useState<OptionSelectCustom>();
	// useSelector
	// const listCollection: Collection[] = useSelector(selectListCollection);

	const listCollectionTransformed = listCollectionTemp.map(
		({ collectionName, collectionId, logo }) => ({
			name: collectionName,
			value: collectionId,
			image: logo,
		})
	);

	useEffect(() => {
		if (isEdit && currentItem) {
			setValue('itemMedia', currentItem.itemMedia);
			setValue('itemThumbnail', currentItem.itemPreviewMedia);
			setValue('itemName', currentItem.itemName);
			setValue('description', currentItem.description);
			setValue('collectionId', currentItem.collectionId);

			setMedia(currentItem.itemMedia);
			setThumbnail(currentItem.itemPreviewMedia);
			setName(currentItem.itemName);
		} else {
			reset();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentItem]);

	useEffect(() => {
		if (isEdit && currentItem) {
			const collectionFilter = listCollectionTemp.find(
				(collection: Collection) => collection.collectionId === currentItem.collectionId
			);

			if (collectionFilter)
				setCurrentCollectionTransformed({
					name: collectionFilter.collectionName,
					value: collectionFilter.collectionId,
					image: collectionFilter.logo,
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listCollectionTemp]);

	const schema = yup
		.object({
			itemMedia: yup
				.mixed()
				.required()
				.test('require a file', 'File is required!', (value: any) => {
					return Boolean(value?.length !== 0);
				}),
			itemThumbnail: yup.mixed().test('require a file', 'File is required', (value: any) => {
				if (!media) return false;
				if (getFileType(media) === 'mp3' && !thumbnail) return false;
				return true;
			}),
			itemName: yup.string().required(),
			description: yup.string().required(),
			collectionId: yup.string().required('Collection is required!'),
		})
		.required();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<IFormAddOrEditItemInputs>({
		resolver: yupResolver(schema),
	});

	// if add item in collection page
	useEffect(() => {
		if (!isEdit && collectionId) {
			setValue('collectionId', collectionId);

			const current = listCollectionTransformed.find((item) => item.value === collectionId);
			if (current) setCurrentCollectionTransformed(current);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [listCollectionTemp]);

	const handleDropMedia = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				setValue('itemMedia', { ...file, preview: URL.createObjectURL(file), raw: file });

				setMedia({ ...file, preview: URL.createObjectURL(file) });
				if (getFileType(file) !== 'mp3') setThumbnail(null);
			}
		},
		[setValue]
	);

	const handleDropThumbnail = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				setValue('itemThumbnail', {
					...file,
					preview: URL.createObjectURL(file),
					raw: file,
				});

				setThumbnail({ ...file, preview: URL.createObjectURL(file) });
			}
		},
		[setValue]
	);

	const handleChangeCollection = (
		collectionTransformed: OptionSelectCustom | null | undefined
	) => {
		if (collectionTransformed) {
			setValue('collectionId', String(collectionTransformed.value));
			setCurrentCollectionTransformed(collectionTransformed);
		} else {
			setValue('collectionId', '');
			setCurrentCollectionTransformed(undefined);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<PageTitle>{isEdit ? 'Edit Item' : 'Create New Item'}</PageTitle>
			{/* <Typography variant="body2" sx={{ mb: 2 }}>
				<Asterisk /> Required field
			</Typography> */}
			<PreviewItemContainer>
				<Box>
					<FieldTitleName>
						Image, Video, Audio, or 3D Model <Asterisk />
					</FieldTitleName>
					<FieldSubTitle>
						Recommended file types: JPG, PNG, GIF, SVG, WEBM, MP4, MP3. Max size: 50 MB.
					</FieldSubTitle>

					<Box sx={{ maxWidth: 320 }}>
						<Box
							sx={{
								position: 'relative',
								margin: '1.5rem 0',
								width: '100%',
								...(getFileType(media) === 'mp3'
									? {
											height: '120px',
									  }
									: {
											paddingBottom: '100%',
									  }),
							}}
						>
							<UploadMediaCustom
								file={media}
								maxSize={52428800}
								onDrop={handleDropMedia}
								error={Boolean(errors.itemMedia)}
								sx={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									borderRadius: '12px',
									padding: 1,
									border: '3px dashed',
									objectFit: 'contain',
								}}
							/>
						</Box>
						{errors.itemMedia?.message && (
							<ErrorMessage>{errors.itemMedia?.message}</ErrorMessage>
						)}
					</Box>

					{media && getFileType(media) === 'mp3' && (
						<Fragment>
							<FieldTitleName>
								Preview Image <Asterisk />
							</FieldTitleName>
							<FieldSubTitle>
								Provide an image (PNG, JPG, or GIF) for the card display of your
								item.
							</FieldSubTitle>

							<Box sx={{ maxWidth: 320 }}>
								<Box
									sx={{
										position: 'relative',
										margin: '1.5rem 0',
										width: '100%',
										paddingBottom: '100%',
									}}
								>
									<UploadMediaCustom
										accept={{
											'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
										}}
										file={thumbnail}
										maxSize={52428800}
										onDrop={handleDropThumbnail}
										error={Boolean(errors.itemThumbnail)}
										sx={{
											position: 'absolute',
											top: 0,
											left: 0,
											width: '100%',
											height: '100%',
											borderRadius: '12px',
											padding: 1,
											border: '3px dashed',
											objectFit: 'contain',
										}}
									/>

									{errors.itemThumbnail?.message && (
										<ErrorMessage>{errors.itemThumbnail?.message}</ErrorMessage>
									)}
								</Box>
							</Box>
						</Fragment>
					)}
				</Box>

				<PreviewItemWrapper>
					<PreviewItem media={media} thumbnail={thumbnail} name={name} />
				</PreviewItemWrapper>
			</PreviewItemContainer>

			<InputGroup sx={{ marginTop: 5 }}>
				<FieldTitleName>
					Name <Asterisk />
				</FieldTitleName>
				<FieldInput
					id="item-name"
					type="text"
					registerHookForm={{ ...register('itemName') }}
					placeholder="Item name"
					onChange={(e: any) => setName(e.target.value)}
				/>
				{errors.itemName?.message && (
					<ErrorMessage>{errors.itemName?.message}</ErrorMessage>
				)}
			</InputGroup>

			<InputGroup>
				<FieldTitleName>
					Description <Asterisk />
				</FieldTitleName>

				<FieldInput
					id="item-description"
					type="text"
					registerHookForm={{ ...register('description') }}
					placeholder="Provide a detailed description of your item"
				/>
				{errors.description?.message && (
					<ErrorMessage>{errors.description?.message}</ErrorMessage>
				)}
			</InputGroup>

			<InputGroup>
				<FieldTitleName>
					Collection <Asterisk />
				</FieldTitleName>
				<FieldSubTitle>This is the collection where your item belongs to.</FieldSubTitle>

				<AutoCompleteCustom2
					currentItem={currentCollectionTransformed}
					listItem={listCollectionTransformed}
					onChange={handleChangeCollection}
					placeholder="Collection name..."
					disabled={isEdit}
					sx={{
						...(isLightTheme
							? {
									backgroundColor: theme.palette.primaryLight.main,
							  }
							: {
									backgroundColor: theme.palette.primary.dark,
							  }),
					}}
				/>

				{errors.collectionId?.message && (
					<ErrorMessage>{errors.collectionId?.message}</ErrorMessage>
				)}
			</InputGroup>

			<InputGroup>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
				>
					<Stack direction="row" alignItems="center">
						<FieldIcon>
							<img src="/atom-light.png" alt="atom icon" />
						</FieldIcon>
						<Box>
							<FieldTitleName>Unlockable Content</FieldTitleName>
							<FieldSubTitle>
								Include unlockable content that can only be revealed by the owner of
								the item. In alpha release this field is set by default.
							</FieldSubTitle>
						</Box>
					</Stack>

					<Box>
						<SwitchButton
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
						/>
					</Box>
				</Stack>
			</InputGroup>

			<InputGroup>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
				>
					<Stack direction="row" alignItems="center">
						<FieldIcon>
							<img src="/atom-light.png" alt="atom light" />
						</FieldIcon>
						<Box>
							<FieldTitleName>Explicit & Sensitive Content</FieldTitleName>
							<FieldSubTitle>
								This item is set as explicit and sensitive content by default.
							</FieldSubTitle>
						</Box>
					</Stack>

					<Box>
						<SwitchButton
							onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
						/>
					</Box>
				</Stack>
			</InputGroup>

			<InputGroup>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					spacing={2}
				>
					<Stack direction="row" alignItems="center">
						<FieldIcon>
							<img src="/atom-light.png" alt="atom icon" />
						</FieldIcon>
						<Box>
							<FieldTitleName>Freeze Metadata</FieldTitleName>
							<FieldSubTitle>
								Freeze your item metadata to the blockchain and no one can edit or
								delete it. (Feel free because you can freeze this item later)
							</FieldSubTitle>
						</Box>
					</Stack>

					<Box>
						<SwitchButton onChange={handleChangeFreezeOption} />
					</Box>
				</Stack>
			</InputGroup>

			<InputGroup>
				<FieldTitleName>Supply</FieldTitleName>
				<FieldSubTitle>
					The number of items that can be minted. In alpha release only non-fungible token
					is supported associated to artwork and its relative.
				</FieldSubTitle>
				<FieldInput id="item-supply" type="number" registerHookForm={{}} placeholder="1" />
			</InputGroup>

			<Box sx={{ marginTop: 8, width: '150px' }}>
				<ButtonGradient type="submit" disabled={isSubmitting}>
					<Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
						{isSubmitting && <CircularProgress sx={{ color: 'white' }} size={25} />}
						<Typography sx={{ fontSize: '18px' }}>
							{isEdit
								? isSubmitting
									? 'Updating...'
									: 'Update'
								: isSubmitting
								? 'Creating...'
								: 'Create'}
						</Typography>
					</Stack>
				</ButtonGradient>
			</Box>
		</form>
	);
}

export default FormAddOrEditItem;
