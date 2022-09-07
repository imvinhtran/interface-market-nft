/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { selectListTokenPayment } from 'redux/slices/tokenPaymentSlice';
import { selectNftItem, selectLoading } from 'redux/slices/nftItemByItemIdSlice';
import { selectAddress, selectChainId, selectCurrentProvider } from 'redux/slices/web3InfoSlice';
import { setConnectModal } from 'redux/slices/modalSlice';
// actions
import { CreateOrderForOfferAction } from 'redux/actions/OrderAction/createOrderForOfferAction';
// mui
import {
	Box,
	Typography,
	CircularProgress,
	useTheme,
	Stepper,
	Step,
	StepLabel,
	StepContent,
	Stack,
} from '@mui/material';
import DateTimePicker from '@mui/lab/DateTimePicker';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
// components
import Modal from 'components/CustomUI/Modal';
import FieldInput from 'components/CustomField/FieldInput';
import SelectCustom from 'components/CustomField/SelectCustom';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import AutoCompleteCustom2 from 'components/CustomField/AutoCompleteCustom2';
// models
import {
	ApproveItemPriceAndServiceFeeForCreateOfferInput,
	HashOrderAndSignForCreateOfferInput,
	NFT,
	OptionSelectCustom,
	OrderResponseAPI,
	TokenPayment,
} from 'models';
// utils
import moment from 'moment';
import { BigNumber } from 'ethers';
import { dateToTimestamp, erc20function, isNativeToken } from 'utils';
// styled
import { SelectAndInputWrapper } from './styled';
import {
	DatePickerTextField,
	DatePickerVisiblePart,
	DatePickerWrapper,
} from 'components/pages/SellItem/DateTimePicker/styled';
// constants
import { ORDER_CONFIGURATION } from '../../../../../constants';
// images
import CardIcon from 'assets/icons/card.webp';

// order actions
const { ApproveItemPriceAndServiceFee, HashOrderAndSign } = CreateOrderForOfferAction();

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

const dateRanges: OptionSelectCustom[] = [
	{ name: '7 days', value: 7 },
	{ name: '1 day', value: 1 },
	{ name: '3 days', value: 3 },
	{ name: '30 days', value: 30 },
	{ name: '60 days', value: 60 },
];

export interface IButtonOfferProps {
	personalOffer: OrderResponseAPI | null;
	loadingPersonalOffer: boolean;
}

export default function ButtonOffer({ personalOffer, loadingPersonalOffer }: IButtonOfferProps) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	// useState
	const [offerPrice, setOfferPrice] = useState<number>(0);
	const [errorOfferMessage, setErrorOfferMessage] = useState<string>('');
	const [currentDuration, setCurrentDuration] = useState<any>(dateRanges[0]);
	const [endDate, setEndDate] = useState<Date | null | undefined>(
		moment(new Date()).add(dateRanges[0].value, 'days').toDate()
	);

	const [currentToken, setCurrentToken] = useState<OptionSelectCustom | null | undefined>();
	const [isCheckingBalance, setIsCheckingBalance] = useState<boolean>(false);

	const [modalOffer, setModalOffer] = useState(false);
	const [modalConfirm, setModalConfirm] = useState(false);
	const [step1, setStep1] = useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = useState<StepStatus>(initialStepStatus);
	const [activeStep, setActiveStep] = useState<number>(0);

	// useSelector
	const item: NFT | null = useSelector(selectNftItem);
	const isLoadingItem = useSelector(selectLoading);
	const chainId = useSelector(selectChainId);
	const userAddress = useSelector(selectAddress);
	const web3Info = useSelector(selectCurrentProvider);
	const listTokenPayment: TokenPayment[] = useSelector(selectListTokenPayment);

	let listPaymentTokenTransformed: OptionSelectCustom[] = listTokenPayment.map(
		(tokenPayment: TokenPayment) => ({
			name: tokenPayment.symbol,
			value: tokenPayment.address,
			image: tokenPayment.logoURI,
		})
	);

	listPaymentTokenTransformed = listPaymentTokenTransformed.filter((val, idx) => {
		return !isNativeToken(String(val.value));
	});

	// useEffect
	// Change Active Step
	useEffect(() => {
		if (step1.isCompleted) {
			setActiveStep(1);
			if (step2.isCompleted) {
				setActiveStep(2);
			}
		}
	}, [step1, step2]);

	// handle toggle modal confirm
	useEffect(() => {
		if (modalConfirm) {
			// Check steps
			// step1
			handleStep1(true); // isCheck = true
		} else {
			// reset step
			setActiveStep(0);
			setStep1({ ...step1, isCompleted: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalConfirm]);

	// reset offer price
	useEffect(() => {
		if (!modalOffer) {
			setOfferPrice(0);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalOffer]);

	// functions
	const isQualifiedToOffer = () => {
		if (
			!isLoadingItem &&
			item &&
			!loadingPersonalOffer &&
			userAddress !== item.owner &&
			listTokenPayment.length > 0 &&
			!personalOffer
		) {
			return true;
		}
		return false;
	};

	const handleOnChangeOfferPrice = (e: any) => {
		const newOfferPrice = Number(e.target.value);
		if (newOfferPrice <= 0) {
			setErrorOfferMessage('Offer price must be greater then 0');
		} else if (newOfferPrice < 0.001) {
			setErrorOfferMessage('Offer price too low! Min price is 0.001!');
		} else {
			setErrorOfferMessage('');
		}
		setOfferPrice(newOfferPrice);
	};

	const onChangeDuration = (duration: OptionSelectCustom) => {
		setCurrentDuration(duration);

		const updateEndDate: Date = moment(new Date()).add(duration.value, 'days').toDate();
		setEndDate(updateEndDate);
	};

	const handleChangeEndDate = (newValue: Date | null | undefined) => {
		if (newValue) {
			setEndDate(newValue);
		}
	};

	const handleChangePaymentToken = (
		currentPaymentToken: OptionSelectCustom | null | undefined
	) => {
		if (currentPaymentToken) {
			setCurrentToken(currentPaymentToken);
		} else {
			setCurrentToken(undefined);
		}
	};

	const handleOffer = async () => {
		if (!userAddress) {
			dispatch(setConnectModal(true));
			return;
		}

		try {
			if (!currentToken) {
				console.log('Missing currentToken!');
				toast.warning('Please choose your payment token!');
				return;
			}

			if (offerPrice <= 0) {
				toast.warning('Offer price must be greater then 0');
				return;
			}

			if (isNativeToken(currentToken.value.toString())) {
				toast.warning('Can not offer with native token!');
				return;
			}

			if (!item || !item.collection || !userAddress || !chainId) {
				console.log('Missing field!');
				return;
			}

			setIsCheckingBalance(true);

			// CHECK BALANCE
			// offer must be SPLIT_FEE_METHOD and FIXED_PRICE and can not with NATIVE COIN
			// if feeMethod = split fee
			const protocolFee: number =
				(offerPrice * ORDER_CONFIGURATION.OFFER_MAKER_PROTOCOL_FEE) / 10000;

			const totalPriceAndFee: number = protocolFee + offerPrice;

			const totalPriceAndFeeToWei: BigNumber = await erc20function().changeTokenToWei(
				currentToken.value.toString(),
				totalPriceAndFee
			);

			console.log('Offerer will pay: ', totalPriceAndFee);

			const isEnough = await erc20function().checkBalance(
				currentToken.value.toString(),
				userAddress,
				totalPriceAndFeeToWei
			);

			if (!isEnough) {
				toast.error('Split fee: Not enough Token to purchase!');
				setIsCheckingBalance(false);
				return;
			}

			setModalConfirm(true);
		} catch (error) {
			console.log(error);
			toast.error('Some error occur when offering item!');
		} finally {
			setIsCheckingBalance(false);
		}
	};

	const handleStep1 = async (isCheck: boolean): Promise<void> => {
		if (!chainId || !userAddress || !currentToken) {
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
		const data: ApproveItemPriceAndServiceFeeForCreateOfferInput = {
			offerPrice,
			paymentToken: currentToken.value.toString(),
			userAddress,
			chainId,
		};
		const isCompleted = await ApproveItemPriceAndServiceFee(data, isCheck);

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

	const handleStep2 = async (): Promise<void> => {
		if (
			!userAddress ||
			!chainId ||
			!web3Info ||
			!currentToken ||
			!item ||
			!item.collection ||
			!endDate
		) {
			console.log('Missing Field Step 2');
			return;
		}

		// setLoading state
		setStep2({ ...step2, isExecuting: true });

		// execute
		const data: HashOrderAndSignForCreateOfferInput = {
			chainId,
			userAddress,
			paymentToken: currentToken.value.toString(),
			offerPrice,
			listingTime: String(dateToTimestamp(new Date())),
			expirationTime: String(dateToTimestamp(endDate)),
			itemTokenId: item.itemTokenId,
			itemStandard: item.standard,
			itemOwner: item.owner,
			collectionAddress: item.collection.collectionAddress,
			collectionOwner: item.collection.userAddress,
			royalties: item.collection.royalties,
			web3: web3Info,
			itemId: item.itemId,
			collectionId: item.collection._id,
		};
		const isCompleted: boolean = await HashOrderAndSign(data);

		// setLoading state
		setStep2({ ...step2, isExecuting: false });

		// set completed state
		if (isCompleted) {
			setStep2({ ...step2, isCompleted: true });
		} else {
			setStep2({ ...step2, isCompleted: false });
		}
	};

	const handleDone = () => {
		window.location.reload();
	};

	return (
		<>
			{isQualifiedToOffer() && (
				<ButtonGradient onClick={() => setModalOffer(true)} sx={{ width: '150px' }}>
					<img src={CardIcon} alt="card icon" height={16} width={22} />

					<Typography variant="body1" sx={{ ml: 1 }} noWrap>
						Offer
					</Typography>
				</ButtonGradient>
			)}

			<Modal
				onOpen={modalOffer}
				allowClose={true}
				onClose={() => {
					setModalOffer(false);
				}}
				mainHeader="Offer"
				style={{ maxWidth: '450px' }}
			>
				{/*-------------------------------Price-------------------------------- */}
				<Box>
					<Typography variant="h6" sx={{ fontWeight: '600', mb: 1 }}>
						Payment token
					</Typography>

					<SelectAndInputWrapper>
						<AutoCompleteCustom2
							currentItem={currentToken}
							listItem={listPaymentTokenTransformed}
							onChange={handleChangePaymentToken}
							placeholder="Token name"
							sx={{
								width: '155px',

								...(isLightTheme
									? {
											backgroundColor: theme.palette.primaryLight.dark,
									  }
									: {
											backgroundColor: theme.palette.primary.main,
									  }),
							}}
						/>

						<FieldInput
							id="price"
							type="number"
							placeholder="0"
							onChange={handleOnChangeOfferPrice}
							sx={{
								border: 'none',
								textAlign: 'right',
								fontSize: '20px',
								textOverflow: 'ellipsis',
								flexGrow: 1,
								...(isLightTheme
									? {
											background: theme.palette.primaryLight.main,
									  }
									: {
											background: theme.palette.primary.dark,
									  }),
							}}
							otherProps={{
								inputMode: 'decimal',
								pattern: '^[0-9]*[.,]?[0-9]*$',
								minLength: 1,
								maxLength: 10,
							}}
						/>
					</SelectAndInputWrapper>

					<Box sx={{ width: '100%' }}>
						<Typography variant="body1" sx={{ color: 'red', pt: 1, textAlign: 'end' }}>
							{errorOfferMessage}
						</Typography>
					</Box>

					<Stack direction="row" justifyContent="space-between">
						<Typography variant="body2">Service fee ( 2% ):</Typography>
						<Typography variant="body2">
							{(offerPrice * ORDER_CONFIGURATION.OFFER_MAKER_PROTOCOL_FEE) / 10000}{' '}
							{currentToken?.name}
						</Typography>
					</Stack>

					<Stack direction="row" justifyContent="space-between">
						<Typography variant="body2">Total:</Typography>
						<Typography variant="body2">
							{offerPrice +
								(offerPrice * ORDER_CONFIGURATION.OFFER_MAKER_PROTOCOL_FEE) /
									10000}{' '}
							{currentToken?.name}
						</Typography>
					</Stack>

					<Typography variant="h6" sx={{ fontWeight: '600', mt: 2, mb: 1 }}>
						Expiration
					</Typography>

					<Stack
						sx={{
							flexDirection: 'row',
							gap: '8px',
							alignItems: 'start',
							[theme.breakpoints.down(480)]: {
								flexDirection: 'column',
							},
						}}
					>
						<SelectCustom
							currentItem={currentDuration}
							listItem={dateRanges}
							onChange={onChangeDuration}
							sx={{
								padding: '10px',
								flexShrink: 0,

								[theme.breakpoints.down(480)]: {
									width: '100%',
								},

								...(isLightTheme
									? {
											backgroundColor: theme.palette.primaryLight.main,
									  }
									: {
											backgroundColor: theme.palette.primary.dark,
									  }),
							}}
						/>

						<Box
							sx={{
								flexGrow: 1,
								[theme.breakpoints.down(480)]: {
									width: '100%',
								},
							}}
						>
							<DatePickerWrapper>
								<DateTimePicker
									disablePast
									value={endDate}
									onChange={(newValue) => handleChangeEndDate(newValue)}
									renderInput={(params) => <DatePickerTextField {...params} />}
								/>
								<DatePickerVisiblePart>
									<Stack
										alignItems="center"
										justifyContent="space-between"
										sx={{ width: '100%' }}
										direction="row"
									>
										<Typography variant="body1">
											{moment(endDate).format('LL')} (
											{moment(endDate).format('LT')})
										</Typography>
										<ArrowDropDownOutlinedIcon sx={{ ml: 2 }} />
									</Stack>
								</DatePickerVisiblePart>
							</DatePickerWrapper>
						</Box>
					</Stack>

					<Box sx={{ width: '80%', mx: 'auto' }}>
						<ButtonGradient
							disabled={isCheckingBalance}
							onClick={handleOffer}
							sx={{ mt: 2, mb: 3 }}
						>
							{isCheckingBalance && (
								<CircularProgress sx={{ color: 'white', mr: 1 }} size={16} />
							)}
							<Typography variant="body1">Offer</Typography>
						</ButtonGradient>
					</Box>
				</Box>
			</Modal>

			<Modal
				onOpen={modalConfirm}
				onClose={() => {
					setModalConfirm(false);
				}}
				allowClose={!step1.isExecuting && !step2.isExecuting && !step2.isCompleted}
				mainHeader={'Complete offering'}
				style={{ maxWidth: '600px', overflowY: 'auto' }}
			>
				<Stepper activeStep={activeStep} orientation="vertical" sx={{ mb: 2 }}>
					{/* ===================================================================== STEP 1 =====================================================================*/}
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
										handleStep1(false); // isCheck = false
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
											: 'Approve'}
									</Typography>
								</ButtonGradient>
							</Box>
						</StepContent>
					</Step>

					{/* ===================================================================== STEP 2 =====================================================================*/}
					<Step>
						<StepLabel optional={<Typography variant="caption">No gas fee</Typography>}>
							Confirm offer
						</StepLabel>
						<StepContent>
							<Typography>
								Accept request of sign type data and put your offer to this item .
							</Typography>
							<Box sx={{ mb: 2 }}>
								<ButtonGradient
									onClick={() => {
										handleStep2();
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
											: 'Confirm'}
									</Typography>
								</ButtonGradient>
							</Box>
						</StepContent>
					</Step>

					{/* ===================================================================== STEP 3 =====================================================================*/}
					<Step>
						<StepLabel optional={null}>Offer Successfully</StepLabel>
						<StepContent>
							<Typography>Your offer is up!</Typography>
							<Box sx={{ mb: 2 }}>
								<ButtonGradient onClick={handleDone} sx={{ width: '180px', mt: 1 }}>
									<Typography variant="button">Agree</Typography>
								</ButtonGradient>
							</Box>
						</StepContent>
					</Step>
				</Stepper>
			</Modal>
		</>
	);
}
