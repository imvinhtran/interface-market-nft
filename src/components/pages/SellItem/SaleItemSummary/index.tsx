/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAddress, selectChainId, selectCurrentProvider } from 'redux/slices/web3InfoSlice';
// actions
import { CreateOrderForSaleAction } from 'redux/actions/OrderAction/createOrderForSaleAction';
import { ApproveWalletNftAsset } from 'redux/actions/OrderAction/common';
// components
import Modal from 'components/CustomUI/Modal';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
// styled
import { ContentText } from './styled';
import { Title } from 'pages/SellItem/styled';
// models
import {
	NFT,
	Collection,
	ApproveWalletNftAssetInput,
	ApproveRoyaltiesFeeForSellInput,
	HashOrderAndSignForSellInput,
} from 'models';
// utils
import { erc20function, isNativeToken, isPlatformTokenAddress, parseUnits } from 'utils';
import moment from 'moment';
import { BigNumber } from 'ethers';
// mui
import {
	Box,
	CircularProgress,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Typography,
} from '@mui/material';
// constants
import { CONTRACT, ORDER_CONFIGURATION } from '../../../../constants';
// context
import { useSelling } from 'contexts/SellingContext';
// order actions
const { ApproveRoyaltiesFee, HashOrderAndSign } = CreateOrderForSaleAction();

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

export interface SaleItemSummaryProps {
	collection: Collection | null;
	currentItem: NFT | null;
}

function SaleItemSummary({ collection, currentItem }: SaleItemSummaryProps) {
	let dispatch = useDispatch();
	const navigate = useNavigate();
	//useState
	const [modal, setModal] = useState(false);
	const [step1, setStep1] = useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = useState<StepStatus>(initialStepStatus);
	const [step3, setStep3] = useState<StepStatus>(initialStepStatus);
	const [activeStep, setActiveStep] = useState<number>(0);

	//Sale kind
	const FIXED = ORDER_CONFIGURATION.FIXED_PRICE;
	const DUTCH = ORDER_CONFIGURATION.DUTCH_AUCTION;

	//context
	const context = useSelling();
	const { state } = context;
	const dispatchContext = context.dispatch;

	const {
		saleKind,
		fixedPrice,
		startPrice,
		endPrice,
		tokenPayment,
		feeMethod,
		startTime,
		endTime,
	} = state;

	const currentProvider = useSelector(selectCurrentProvider);
	const address = useSelector(selectAddress);
	const chainId = useSelector(selectChainId);

	// useEffect
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

	// handle toggle modal
	useEffect(() => {
		if (modal) {
			// Check steps
			// step1
			handleStep1(true); // isCheck = true
			// step2
			handleStep2(true); // isCheck = true
		} else {
			// reset step
			setActiveStep(0);
			setStep1({ ...step1, isCompleted: false });
			setStep2({ ...step2, isCompleted: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modal]);

	// functions
	const onSubmit = async () => {
		if (saleKind === FIXED) {
			if (fixedPrice <= 0) {
				toast.warning('Invalid price!');
				return;
			}
		} else {
			if (startPrice <= 0 || endPrice <= 0) {
				toast.warning('Invalid price!');
				return;
			}
		}

		try {
			// check royalties fee
			if (!collection || !tokenPayment || !address || !chainId) {
				console.log('Missing Field Check Royalties Fee!');
				return;
			}

			if (!feeMethod && !isPlatformTokenAddress(String(tokenPayment.value), chainId)) {
				let royaltiesFee;
				if (saleKind === FIXED) {
					royaltiesFee = (collection.royalties / 100) * fixedPrice;
				} else {
					royaltiesFee = (collection.royalties / 100) * startPrice;
				}
				let royaltiesFeeToWei: BigNumber = BigNumber.from(0);

				if (isNativeToken(String(tokenPayment.value))) {
					// is native coin
					royaltiesFeeToWei = parseUnits(royaltiesFee.toString(), 18);
				} else {
					// is not native coin
					royaltiesFeeToWei = await erc20function().changeTokenToWei(
						String(tokenPayment.value),
						royaltiesFee
					);
				}
				console.log('royaltiesFeeToWei', royaltiesFeeToWei.toString());

				const isEnough: boolean = await erc20function().checkBalance(
					CONTRACT[chainId].EXCHANGE_TOKEN,
					address,
					royaltiesFeeToWei
				);

				if (!isEnough) {
					toast.error('Not enough platform token for royalties fee!');
					return;
				}
			}

			setModal(true);
		} catch (error) {
			console.log(error);
		}
	};

	const specifyFeeMethod = (): number => {
		// dutch must be split_fee method
		if (saleKind === DUTCH) {
			return ORDER_CONFIGURATION.SPLIT_FEE_METHOD;
		} else {
			if (feeMethod) {
				return ORDER_CONFIGURATION.SPLIT_FEE_METHOD;
			} else {
				return ORDER_CONFIGURATION.PROTOCOL_FEE_METHOD;
			}
		}
	};

	const specifyStartPrice = (): number => {
		if (saleKind === FIXED) {
			return fixedPrice;
		} else {
			return startPrice;
		}
	};

	const specifyEndPrice = (): number => {
		if (saleKind === FIXED) {
			return fixedPrice;
		} else {
			return endPrice;
		}
	};

	const handleStep1 = async (isCheck: boolean): Promise<void> => {
		if (!chainId || !address || !collection) {
			console.log('Missing Field Step 1');
			return;
		}

		// setLoading state
		if (isCheck) {
			setStep1({ ...step1, isChecking: true });
		} else {
			setStep1({ ...step1, isExecuting: true });
		}

		// execute
		const data: ApproveWalletNftAssetInput = {
			chainId,
			userAddress: address,
			collectionAddress: collection.collectionAddress,
			itemStandard: collection.collectionStandard,
		};
		const isCompleted = await ApproveWalletNftAsset(data, isCheck);

		// setLoading state
		if (isCheck) {
			setStep1({ ...step1, isChecking: false });
		} else {
			setStep1({ ...step1, isExecuting: false });
		}

		// set completed state
		if (isCompleted) {
			setStep1({ ...step1, isCompleted: true });
		} else {
			setStep1({ ...step1, isCompleted: false });
		}
	};

	const handleStep2 = async (isCheck: boolean): Promise<void> => {
		if (!collection || !tokenPayment || !address || !chainId) {
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
		const data: ApproveRoyaltiesFeeForSellInput = {
			feeMethod: specifyFeeMethod(),
			royalties: collection.royalties,
			startPrice: specifyStartPrice(),
			paymentToken: String(tokenPayment.value),
			chainId,
			userAddress: address,
		};
		const isCompleted: boolean = await ApproveRoyaltiesFee(data, isCheck);

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
		if (!chainId || !address || !currentItem || !collection || !tokenPayment) {
			console.log('Missing Field Step 3');
			return;
		}
		// setLoading state
		setStep3({ ...step3, isExecuting: true });

		// execute
		// dutch must be split_fee method
		const data: HashOrderAndSignForSellInput = {
			chainId,
			userAddress: address,
			paymentToken: String(tokenPayment.value),
			feeMethod: specifyFeeMethod(),
			startPrice: specifyStartPrice(),
			endPrice: specifyEndPrice(),
			itemTokenId: currentItem.itemTokenId,
			itemStandard: currentItem.standard,
			collectionAddress: collection.collectionAddress,
			collectionOwner: collection.userAddress,
			royalties: collection.royalties,
			web3: currentProvider,
			startTime: moment(startTime).format('X'),
			endTime: moment(endTime).format('X'),
			saleKind,
			itemId: currentItem.itemId,
			collectionId: collection.collectionId,
		};
		const isCompleted = await HashOrderAndSign(data);

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
		if (currentItem) navigate(`/detail/${currentItem.itemId}`);
	};

	return (
		<>
			<Stack spacing={5}>
				{saleKind === FIXED && (
					<Box sx={{ display: 'flex', gap: 1 }}>
						<Title variant="h6">Price:</Title>
						<ContentText variant="h6">
							{state.fixedPrice} {state.tokenPayment?.name}
						</ContentText>
					</Box>
				)}
				{saleKind === DUTCH && (
					<Fragment>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Title variant="h6">Start price:</Title>
							<ContentText variant="h6">
								{state.startPrice} {state.tokenPayment?.name}
							</ContentText>
						</Box>
						<Box sx={{ display: 'flex', gap: 1 }}>
							<Title variant="h6">End price:</Title>
							<ContentText variant="h6">
								{state.endPrice} {state.tokenPayment?.name}
							</ContentText>
						</Box>
					</Fragment>
				)}

				<Box>
					<Title variant="h6">Start sale:</Title>
					<ContentText variant="h6">
						{moment(startTime).format('MMMM DD, YYYY, h:mm a')}
					</ContentText>
				</Box>
				<Box>
					<Title variant="h6">End sale:</Title>
					<ContentText variant="h6">
						{moment(endTime).format('MMMM DD, YYYY, h:mm a')}
					</ContentText>
				</Box>

				<Box>
					<Title variant="h6">Fees:</Title>
					<ContentText variant="h6">
						Listing is free! At the time of the sale, the following fees will be
						deducted.
					</ContentText>
					<ContentText variant="h6">- Royalties: {collection?.royalties}%</ContentText>
					<ContentText variant="h6">
						- Service fee:{' '}
						{saleKind === FIXED &&
						feeMethod === Boolean(ORDER_CONFIGURATION.PROTOCOL_FEE_METHOD)
							? '0'
							: '2'}
						%
					</ContentText>
				</Box>
				<Box>
					<ButtonGradient
						onClick={onSubmit}
						disabled={
							!address ||
							!chainId ||
							!currentItem ||
							!tokenPayment?.value ||
							!collection
						}
					>
						<Typography variant="h6">Listing</Typography>
					</ButtonGradient>
				</Box>
			</Stack>

			<Modal
				onOpen={modal}
				onClose={() => {
					setModal(false);
				}}
				allowClose={
					!step1.isExecuting &&
					!step2.isExecuting &&
					!step3.isExecuting &&
					!step3.isCompleted
				}
				mainHeader={'Complete listing'}
				style={{ maxWidth: '600px', overflowY: 'auto' }}
			>
				<Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
					{/* ===================================================================== STEP 1 =====================================================================*/}
					<Step>
						<StepLabel
							optional={<Typography variant="caption">One-time fees</Typography>}
						>
							Initialize your account
						</StepLabel>
						<StepContent>
							<Typography>
								One-time fees are incurred whenever you initialize your account for
								the first time.
							</Typography>
							<Box sx={{ mb: 2 }}>
								<ButtonGradient
									onClick={() => {
										handleStep1(false);
									}}
									disabled={step1.isChecking || step1.isExecuting}
									sx={{ width: '180px' }}
								>
									{(step1.isChecking || step1.isExecuting) && (
										<CircularProgress
											sx={{ color: 'white', mr: 1 }}
											size={16}
										/>
									)}

									<Typography variant="button">
										{step1.isChecking
											? 'Checking...'
											: step1.isExecuting
											? 'Executing...'
											: 'Initialize'}
									</Typography>
								</ButtonGradient>
							</Box>
						</StepContent>
					</Step>

					{/* ===================================================================== STEP 2 =====================================================================*/}
					<Step>
						<StepLabel
							optional={<Typography variant="caption">Recurring fees</Typography>}
						>
							Approve token
						</StepLabel>
						<StepContent>
							<Typography>
								Recurring fees are incurred whenever doing actions on blockchain.
							</Typography>
							<Box sx={{ mb: 2 }}>
								<ButtonGradient
									onClick={() => {
										handleStep2(false);
									}}
									disabled={step2.isChecking || step2.isExecuting}
									sx={{ width: '180px', mt: 1 }}
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
											: 'Approve'}
									</Typography>
								</ButtonGradient>
							</Box>
						</StepContent>
					</Step>

					{/* ===================================================================== STEP 3 =====================================================================*/}
					<Step>
						<StepLabel optional={<Typography variant="caption">No gas fee</Typography>}>
							Confirm listing
						</StepLabel>
						<StepContent>
							<Typography>
								Accept request of sign type data and list your NFT item to NFTSpaceX
								marketplace.
							</Typography>
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
											: 'Confirm'}
									</Typography>
								</ButtonGradient>
							</Box>
						</StepContent>
					</Step>

					{/* ===================================================================== STEP 4 =====================================================================*/}
					<Step>
						<StepLabel optional={null}>Listing Successfully</StepLabel>
						<StepContent>
							<Typography>Your item is listing!</Typography>
							<Box sx={{ mb: 2 }}>
								<ButtonGradient onClick={handleDone} sx={{ width: '180px', mt: 1 }}>
									<Typography variant="button">View listing</Typography>
								</ButtonGradient>
							</Box>
						</StepContent>
					</Step>
				</Stepper>
			</Modal>
		</>
	);
}

export default SaleItemSummary;
