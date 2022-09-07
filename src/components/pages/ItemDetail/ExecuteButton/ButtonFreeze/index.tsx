/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
// mui
import {
	Box,
	Button,
	Checkbox,
	CircularProgress,
	Stack,
	Step,
	StepContent,
	StepLabel,
	Stepper,
	Tooltip,
	Typography,
	useTheme,
} from '@mui/material';
// image
import IconFreezeWhite from 'assets/icons/freeze-white.webp';
import IconFreezeBlack from 'assets/icons/freeze-black.webp';
// components
import Modal from 'components/CustomUI/Modal';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
// redux
import { useSelector } from 'react-redux';
import { selectNftItem, selectLoading } from 'redux/slices/nftItemByItemIdSlice';
import { selectAddress, selectCurrentProvider } from 'redux/slices/web3InfoSlice';
// actions
import { FreezeItemAction } from 'redux/actions/OrderAction/freezeItemAction';
// models
import { FreezeItemInput, MintItemInput, NFT } from 'models';
import DividerGradient from 'components/CustomUI/DividerGradient';
// item actions
const { MintItem, FreezeItem } = FreezeItemAction();

export interface StepStatus {
	isChecking: boolean;
	isExecuting: boolean;
	isCompleted: boolean;
}

const initialStepStatus: StepStatus = {
	isChecking: false,
	isExecuting: false,
	isCompleted: false,
};
export interface IButtonFreezeProps {
	refetchApi: Function;
}

export default function ButtonFreeze({ refetchApi }: IButtonFreezeProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';

	// useState
	const [modal, setModal] = useState<boolean>(false);
	const [step1, setStep1] = useState<StepStatus>(initialStepStatus);
	const [step2, setStep2] = useState<StepStatus>(initialStepStatus);
	const [activeStep, setActiveStep] = useState<number>(0);
	const [checked, setChecked] = useState<boolean>(false);

	// useSelector
	const item: NFT | null = useSelector(selectNftItem);
	const isLoadingItem = useSelector(selectLoading);
	const userAddress = useSelector(selectAddress);
	const web3Info = useSelector(selectCurrentProvider);

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

	// handle toggle modal
	useEffect(() => {
		if (modal) {
			// Check steps
			// step1
			handleStep1(true); // isCheck = true
		} else {
			// reset step
			setActiveStep(0);
			setStep1({ ...step1, isCompleted: false });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modal]);

	// functions
	const isQualifiedToFreeze = (): boolean => {
		if (
			!isLoadingItem &&
			item &&
			item.isFreeze === false &&
			userAddress === item.creator &&
			userAddress === item.owner
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};

	const handleFreezeItem = () => {
		setModal(true);
	};

	const handleStep1 = async (isCheck: boolean): Promise<void> => {
		if (!item || !item.collection || !userAddress) {
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
		const data: MintItemInput = {
			itemTokenId: item.itemTokenId,
			itemStandard: item.standard,
			collectionAddress: item.collection.collectionAddress,
			userAddress,
			web3: web3Info,
		};
		const isCompleted = await MintItem(data, isCheck);

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
		if (!item || !item.collection || !userAddress) {
			console.log('Missing Field Step 2');
			return;
		}

		// setLoading state
		setStep2({ ...step2, isExecuting: true });

		// execute
		const data: FreezeItemInput = {
			itemId: item.itemId,
			itemStandard: item.standard,
			collectionAddress: item.collection.collectionAddress,
			userAddress,
		};
		const isCompleted: boolean = await FreezeItem(data);

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
		refetchApi();
	};

	return (
		<>
			{isQualifiedToFreeze() && (
				<>
					<Button onClick={handleFreezeItem}>
						<Tooltip title="Freeze item" arrow placement="top">
							{isLightTheme ? (
								<img src={IconFreezeBlack} alt="edit icon" width={22} height={22} />
							) : (
								<img src={IconFreezeWhite} alt="edit icon" width={22} height={22} />
							)}
						</Tooltip>
					</Button>

					<Modal
						onOpen={modal}
						mainHeader="Freeze metadata"
						style={{ maxWidth: '450px', overflowY: 'auto' }}
						allowClose={true}
						onClose={() => {
							setModal(false);
						}}
					>
						<Typography variant="body2">
							Locking my metadata, my content is permanently stored in decentralized
							file storage (IPFS) and cannot be edited nor removed. All of my content
							is exactly how it's intended to be presented.
						</Typography>

						<Stack
							direction="row"
							alignItems="center"
							sx={{ marginLeft: '-10px', mt: 2, mb: 2 }}
						>
							<Checkbox
								checked={checked}
								aria-checked="false"
								onChange={handleChangeCheckBox}
							/>
							<Typography variant="body2" component="span">
								I understand.
							</Typography>
						</Stack>

						{/* <ButtonGradient
							disabled={!checked || isLoading}
							onClick={() => {
								handleFreezeItem();
							}}
							sx={{ mb: 2, mt: 1 }}
						>
							{isLoading && (
								<CircularProgress sx={{ color: 'white', mr: 1 }} size={16} />
							)}

							<Typography variant="body1" sx={{ ml: 1 }} noWrap>
								{isLoading ? 'Freezing...' : 'Freeze'}
							</Typography>
						</ButtonGradient> */}

						{checked && (
							<>
								<DividerGradient />
								<Stepper
									activeStep={activeStep}
									orientation="vertical"
									sx={{ mb: 2, mt: 1 }}
								>
									{/* ===================================================================== STEP 1 =====================================================================*/}
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
												Recurring fees are incurred whenever doing actions
												on blockchain.
											</Typography>
											<Box sx={{ mb: 2, mt: 1 }}>
												<ButtonGradient
													onClick={() => {
														handleStep1(false); // isCheck = false
													}}
													disabled={
														step1.isChecking ||
														step1.isExecuting ||
														!checked
													}
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
															: 'Mint'}
													</Typography>
												</ButtonGradient>
											</Box>
										</StepContent>
									</Step>

									{/* ===================================================================== STEP 2 =====================================================================*/}
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
														handleStep2();
													}}
													disabled={
														step2.isChecking ||
														step2.isExecuting ||
														!checked
													}
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
															: 'Freeze'}
													</Typography>
												</ButtonGradient>
											</Box>
										</StepContent>
									</Step>

									{/* ===================================================================== STEP 3 =====================================================================*/}
									<Step>
										<StepLabel optional={null}>
											Freeze metadata successfully
										</StepLabel>
										<StepContent>
											<Typography>
												Now your metadata is freeze, no one can edit it!
											</Typography>
											<Box sx={{ mb: 2 }}>
												<ButtonGradient
													onClick={handleDone}
													sx={{ width: '180px', mt: 1 }}
												>
													<Typography variant="button">Agree</Typography>
												</ButtonGradient>
											</Box>
										</StepContent>
									</Step>
								</Stepper>
							</>
						)}
					</Modal>
				</>
			)}
		</>
	);
}
