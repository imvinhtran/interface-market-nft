/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	NFT,
	CreateAndUpdateNFTInput,
	Collection,
	UploadItemResponse,
	MintItemInput,
	FreezeItemInput,
} from 'models';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
// redux slice
import {
	selectLoading as selectLoadingItem,
	selectNftItem,
} from 'redux/slices/nftItemByItemIdSlice';
import { selectLoading as selectLoadingCollection } from 'redux/slices/collectionSlice';
import { selectLoading as selectLoadingAddOrEditItem } from 'redux/slices/collectionItemSlice';
import { selectAddress, selectChainId, selectCurrentProvider } from 'redux/slices/web3InfoSlice';
import { FreezeItemAction } from 'redux/actions/OrderAction/freezeItemAction';
// redux action
import { fetchDetailNftItemById } from 'redux/actions/nftItemByItemIdAction';
// api
import nftsApi from 'apis/nftsApi';
import collectionApi from 'apis/collectionApi';
import uploadApi from 'apis/uploadApi';
// component
import Modal from 'components/CustomUI/Modal';
import FormAddOrEditItem, { IFormAddOrEditItemInputs } from 'components/Form/FormAddOrEditItem';
import Loading from 'components/CustomUI/LoadingPage';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
// mui
import {
	Box,
	CircularProgress,
	Container,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
import { fetchAllCollection } from 'redux/actions/collectionAction';
import LinearBuffer from 'components/CustomUI/UploadProgress';
import fakeRequest from 'utils/fakeRequest';

// item actions
const { MintItem, FreezeItem } = FreezeItemAction();

interface StepStatus {
	isChecking: boolean;
	isExecuting: boolean;
	isCompleted: boolean;
}

const initialStepStatus: StepStatus = {
	isChecking: false,
	isExecuting: false,
	isCompleted: false,
};

function CreateOrEditItem() {
	const { pathname } = useLocation();
	const isEdit = pathname.includes('edit');
	const { itemId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	// useState
	const [modalItemError, setModalItemError] = useState(false);
	const [modalNotHaveCollection, setModalNotHaveCollection] = useState(false);
	const [listCollectionTemp, setListCollectionTemp] = useState<Collection[]>([]);
	const [freezeNow, setFreezeNow] = useState<boolean>(false);
	const [newItemDetail, setNewItemDetail] = useState<NFT | null>(null);

	const [modal, setModal] = useState(false);
	const [step1, setStep1] = useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = useState<StepStatus>(initialStepStatus);
	const [step3, setStep3] = useState<StepStatus>(initialStepStatus);
	const [activeStep, setActiveStep] = useState<number>(0);

	// useSelector
	const item: NFT | null = useSelector(selectNftItem);
	const userAddress = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);
	const isLoadingItem = useSelector(selectLoadingItem);
	const isLoadingCollection = useSelector(selectLoadingCollection);
	const isLoadingAddOrEditItem = useSelector(selectLoadingAddOrEditItem);
	const web3Info = useSelector(selectCurrentProvider);

	// useEffect
	// if isEdit: fetch nft item by id
	useEffect(() => {
		if (isEdit && itemId) {
			dispatch(fetchDetailNftItemById(itemId, executeAfterFetchNftItemById));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [chainId]);

	// fetch list collection
	useEffect(() => {
		if (userAddress && chainId) {
			dispatch(
				fetchAllCollection(
					{ pageSize: 9999, page: 1 },
					{ userAddress },
					true,
					executeAfterFetchListCollection
				)
			);
		}
	}, [dispatch, userAddress, chainId]);

	// Change Active Step
	useEffect(() => {
		if (step1.isCompleted) {
			setActiveStep(1);
			if (step2.isCompleted) {
				setActiveStep(2);
				if (step3.isCompleted) {
					setActiveStep(3);
				}
			}
		}
	}, [step1, step2, step3]);

	// function
	const executeAfterFetchNftItemById = (globalStateNewest: RootState) => {
		const { nftItem } = globalStateNewest;
		if (!nftItem.isSuccess) {
			setModalItemError(true);
		}
	};

	const executeAfterFetchListCollection = async (globalStateNewest: RootState) => {
		const { collection } = globalStateNewest;
		if (!collection.isSuccess) {
			toast.error(
				'Some error occur when getting your collections!' + collection.errorMessage
			);
		} else {
			if (collection.listCollections.length <= 0) {
				setModalNotHaveCollection(true);
				setListCollectionTemp([]);
			} else {
				try {
					const list = await Promise.all(
						collection.listCollections.map(async (item: any, idx: number) => {
							const res = await collectionApi.getCollectionById(item._id);
							return res;
						})
					);
					setListCollectionTemp(list);
				} catch (error) {
					toast.error('Some error occur when getting your collections!');
				}
			}
		}
	};

	const handleChangeFreezeOption = (event: any) => {
		setFreezeNow(event.target.checked);
	};

	const onSubmit = async (data: IFormAddOrEditItemInputs) => {
		setModal(true);
		let itemIdTemp: string = '';

		try {
			// --------------------------------step1: upload media
			setStep1({ ...step1, isExecuting: true });

			const media: any = data.itemMedia;
			const thumbnail: any = data.itemThumbnail;
			let mediaURL: UploadItemResponse = { itemMedia: '', itemOriginMedia: '' };
			let thumbnailURL: UploadItemResponse = { itemMedia: '', itemOriginMedia: '' };

			console.log(thumbnail);

			if (typeof media === 'string') {
				mediaURL.itemMedia = media;
			} else {
				const mediaForm = new FormData();
				mediaForm.append('file', media.raw);
				mediaURL = await uploadApi.uploadItemMedia(mediaForm);
			}

			if (thumbnail) {
				if (typeof thumbnail === 'string') {
					thumbnailURL.itemMedia = thumbnail;
				} else {
					const thumbnailForm = new FormData();
					thumbnailForm.append('file', thumbnail.raw);
					thumbnailURL = await uploadApi.uploadItemMedia(thumbnailForm);
				}
			}

			if (!isEdit) {
				const newData: CreateAndUpdateNFTInput = {
					...data,
					itemMedia: mediaURL.itemMedia,
					itemPreviewMedia: thumbnailURL.itemMedia,
					itemOriginMedia: mediaURL.itemOriginMedia,
					userAddress: userAddress!,
					creator: userAddress!,
					chainId,
				};

				const newItem: NFT = await nftsApi.createNft(newData, chainId);
				itemIdTemp = newItem.itemId;
				// navigate(`/collections/view/${data.collectionId}`);
				toast.success('Create item success!!');
			} else {
				if (item && itemId) {
					const updateData: CreateAndUpdateNFTInput = {
						...item,
						...data,
						itemMedia: mediaURL.itemMedia,
						itemPreviewMedia: thumbnailURL.itemMedia,
						itemOriginMedia: mediaURL.itemOriginMedia,
					};

					await nftsApi.updateNftByItemId(updateData, userAddress!, itemId);
					itemIdTemp = itemId;
					// navigate(`/detail/${itemId}`);
					toast.success('Update item success!!');
				}
			}

			const response: NFT = await nftsApi.getDetailNftItemById(itemIdTemp);
			setNewItemDetail(response);

			setStep1({ ...step1, isExecuting: false });
			await fakeRequest(1000);
			setStep1({ ...step1, isCompleted: true });

			if (freezeNow) {
				// state not updated yet, so we pass prop newItem to handleStep2() func
				handleStep2(response, true); // isCheck = true
			}
		} catch (error: any) {
			toast.error(error.message);
			setModal(false);
		}
	};

	const handleStep2 = async (itemDetail: NFT | null, isCheck: boolean): Promise<void> => {
		if (!itemDetail || !itemDetail.collection || !userAddress) {
			console.log('Missing Field Step 2');
			return;
		}

		// setLoading state
		if (isCheck) {
			setStep2({ ...step2, isChecking: true });
		} else {
			setStep2({ ...step2, isExecuting: true });
		}

		// execute
		const data: MintItemInput = {
			itemTokenId: itemDetail.itemTokenId,
			itemStandard: itemDetail.standard,
			collectionAddress: itemDetail.collection.collectionAddress,
			userAddress,
			web3: web3Info,
		};
		const isCompleted = await MintItem(data, isCheck);

		// setLoading state
		if (isCheck) {
			setStep2({ ...step2, isChecking: false });
		} else {
			setStep2({ ...step2, isExecuting: false });
		}

		// set completed state
		if (isCompleted) {
			setStep2({ ...step2, isCompleted: true });
		} else {
			setStep2({ ...step2, isCompleted: false });
		}
	};

	const handleStep3 = async (): Promise<void> => {
		if (!newItemDetail || !newItemDetail.collection || !userAddress) {
			console.log('Missing Field Step 3');
			return;
		}

		// setLoading state
		setStep3({ ...step3, isExecuting: true });

		// execute
		const data: FreezeItemInput = {
			itemId: newItemDetail.itemId,
			itemStandard: newItemDetail.standard,
			collectionAddress: newItemDetail.collection.collectionAddress,
			userAddress,
		};
		const isCompleted: boolean = await FreezeItem(data);

		// setLoading state
		setStep3({ ...step3, isExecuting: false });

		// set completed state
		if (isCompleted) {
			setStep3({ ...step3, isCompleted: true });
		} else {
			setStep3({ ...step3, isCompleted: false });
		}
	};

	const handleDone = () => {
		navigate(`/detail/${newItemDetail?.itemId}`);
	};

	return (
		<>
			{isLoadingItem || isLoadingCollection || isLoadingAddOrEditItem ? (
				<Loading />
			) : (
				<Container>
					<Box>
						<FormAddOrEditItem
							isEdit={isEdit}
							currentItem={item}
							listCollectionTemp={listCollectionTemp}
							handleChangeFreezeOption={handleChangeFreezeOption}
							onSubmit={onSubmit}
						/>
					</Box>

					<Modal
						onOpen={modal}
						allowClose={false}
						mainHeader={isEdit ? 'Edit item' : 'Create item'}
						style={{ maxWidth: '450px', overflowY: 'auto' }}
					>
						<Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
							{/* ===================================================================== STEP 1 =====================================================================*/}
							<Step>
								<StepLabel
									optional={
										<Typography variant="caption">No gas fees</Typography>
									}
								>
									Upload media
								</StepLabel>
								<StepContent>
									<Typography>
										We are uploading your media to our store.
									</Typography>

									<LinearBuffer isCompleted={step1.isExecuting} />
								</StepContent>
							</Step>

							{/* ===================================================================== STEP 2 =====================================================================*/}
							{freezeNow && (
								<Step>
									<StepLabel
										optional={
											<Typography variant="caption">
												Recurring fees
											</Typography>
										}
									>
										Mint item
									</StepLabel>
									<StepContent>
										<Typography>
											Recurring fees are incurred whenever doing actions on
											blockchain.
										</Typography>
										<Box sx={{ mb: 2, mt: 1 }}>
											<ButtonGradient
												onClick={() => {
													handleStep2(newItemDetail, false); // isCheck = false
												}}
												disabled={step2.isChecking || step2.isExecuting}
												sx={{ width: '180px' }}
											>
												{(step2.isChecking || step2.isExecuting) && (
													<CircularProgress
														sx={{ color: 'white', mr: 1 }}
														size={16}
													/>
												)}

												<Typography variant="button">
													{step2.isChecking
														? 'Checking...'
														: step2.isExecuting
														? 'Executing...'
														: 'Mint'}
												</Typography>
											</ButtonGradient>
										</Box>
									</StepContent>
								</Step>
							)}

							{/* ===================================================================== STEP 3 =====================================================================*/}
							{freezeNow && (
								<Step>
									<StepLabel
										optional={
											<Typography variant="caption">
												Recurring fees
											</Typography>
										}
									>
										Freeze item
									</StepLabel>
									<StepContent>
										<Typography>Freeze data to blockchain.</Typography>
										<Box sx={{ mb: 2 }}>
											<ButtonGradient
												onClick={() => {
													handleStep3();
												}}
												disabled={step3.isChecking || step3.isExecuting}
												sx={{ width: '180px', mt: 1 }}
											>
												{(step3.isChecking || step3.isExecuting) && (
													<CircularProgress
														sx={{ color: 'white', mr: 1 }}
														size={16}
													/>
												)}

												<Typography variant="button">
													{step3.isChecking
														? 'Checking...'
														: step3.isExecuting
														? 'Executing...'
														: 'Freeze'}
												</Typography>
											</ButtonGradient>
										</Box>
									</StepContent>
								</Step>
							)}

							{/* ===================================================================== STEP 4 =====================================================================*/}
							<Step>
								<StepLabel optional={null}>
									{isEdit ? 'Update' : 'Create'} Successfully
								</StepLabel>
								<StepContent>
									<Typography>
										{isEdit ? 'Your item is updated!' : 'Your item is online!'}
									</Typography>
									<Box sx={{ mb: 2 }}>
										<ButtonGradient
											onClick={handleDone}
											sx={{ width: '180px', mt: 1 }}
										>
											<Typography variant="button">View now</Typography>
										</ButtonGradient>
									</Box>
								</StepContent>
							</Step>
						</Stepper>
					</Modal>

					{isEdit && modalItemError ? (
						<Modal
							onOpen={modalItemError}
							mainHeader="Can not find item!"
							onClose={() => {
								navigate('/my-info-account');
							}}
						>
							<Typography sx={{ pb: 2, textAlign: 'center' }}>
								We can not find this item!
							</Typography>
						</Modal>
					) : (
						''
					)}

					{!isEdit && modalNotHaveCollection ? (
						<Modal
							onOpen={modalNotHaveCollection}
							mainHeader="You have no collection yet!"
							onClose={() => {
								navigate('/my-info-account');
							}}
							style={{ maxWidth: '400px' }}
						>
							<Box
								sx={{
									width: '100%',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									flexDirection: 'column',
									paddingBottom: '1.5rem',
								}}
							>
								<Typography>Item must be in one specified collection!</Typography>
								<Stack alignItems="center" sx={{ mt: 2 }}>
									<ButtonGradient
										onClick={() => {
											navigate('/collections/create-collection');
										}}
										sx={{ width: 'fit-content' }}
									>
										Create A Collection
									</ButtonGradient>
								</Stack>
							</Box>
						</Modal>
					) : (
						''
					)}
				</Container>
			)}
		</>
	);
}

export default CreateOrEditItem;
