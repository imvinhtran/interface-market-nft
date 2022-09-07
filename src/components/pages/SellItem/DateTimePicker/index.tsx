import React, { Fragment, useState } from 'react';
import moment, { Moment } from 'moment';
//mui
import DateTimePicker from '@mui/lab/DateTimePicker';
import { Box, Stack, Typography, useTheme } from '@mui/material';
//utils
import { compareDate } from 'utils';
//styled
import { DatePickerTextField, DatePickerVisiblePart, DatePickerWrapper } from './styled';
import { Title } from 'pages/SellItem/styled';
//components
import SelectCustom from 'components/CustomField/SelectCustom';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
//context
import { useSelling } from 'contexts/SellingContext';
// models
import { OptionSelectCustom } from 'models';
// image
import IconCalendarWhite from 'assets/icons/calendar-white.webp';
import IconCalendarBlack from 'assets/icons/calendar-black.webp';

export interface IDateTimeCustomPickerProps {}

const dateRanges: OptionSelectCustom[] = [
	{ name: '7 days (Default)', value: 7 },
	{ name: '1 day', value: 1 },
	{ name: '3 days', value: 3 },
	{ name: '30 days', value: 30 },
	{ name: '60 days', value: 60 },
];

export default function DateTimeCustomPicker(props: IDateTimeCustomPickerProps) {
	const theme = useTheme();
	const isLightTheme = theme.palette.mode === 'light';
	//context
	const context = useSelling();
	const { state, dispatch } = context;

	const { startTime, endTime } = state;

	const [currentDuration, setCurrentDuration] = useState<any>(dateRanges[0]);

	// change endDate base on startDate and selected duration
	const onChangeDuration = (duration: OptionSelectCustom) => {
		setCurrentDuration(duration);
		const updateEndDate: Moment = moment(startTime).add(duration.value, 'days');

		// setValue('endDate', updateEndDate.format('L'));
		dispatch({ type: 'SET_END_TIME', value: updateEndDate });
	};

	const handleChangeStartDateTime = (newValue: Date | null) => {
		if (newValue) {
			dispatch({ type: 'SET_START_TIME', value: newValue });

			// change endDate if new startDate >= endDate

			if (compareDate(newValue, endTime) >= 0) {
				const newEndDate: Date = moment(newValue).add(1, 'days').toDate();
				dispatch({ type: 'SET_END_TIME', value: newEndDate });
			}

			// setValue('startDate', moment(newValue).format('L'));
		}
	};

	const handleChangeEndDateTime = (newValue: Date | null) => {
		if (newValue) {
			// change endDate if startDate >= new endDate

			if (compareDate(startTime, newValue) >= 0) {
				const newEndDate: Date = moment(startTime).add(1, 'days').toDate();
				dispatch({ type: 'SET_END_TIME', value: newEndDate });
			} else {
				dispatch({ type: 'SET_END_TIME', value: newValue });
			}

			// setValue('endDate', moment(newValue).format('L'));
		}
	};

	return (
		<Fragment>
			<SelectCustom
				currentItem={currentDuration}
				listItem={dateRanges}
				onChange={onChangeDuration}
				headerIcon={isLightTheme ? IconCalendarBlack : IconCalendarWhite}
				sx={{
					padding: '10px',

					...(isLightTheme
						? {
								backgroundColor: theme.palette.primaryLight.main,
						  }
						: {
								backgroundColor: theme.palette.primary.dark,
						  }),
				}}
			/>

			<Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
				<Title variant="h6" sx={{ mb: 2, flexShrink: 0, width: '80px' }}>
					Starting
				</Title>

				<Box sx={{ flexGrow: 1 }}>
					<DatePickerWrapper>
						<DateTimePicker
							disablePast
							value={startTime}
							onChange={(newValue) => handleChangeStartDateTime(newValue)}
							renderInput={(params) => <DatePickerTextField {...params} />}
						/>
						<DatePickerVisiblePart>
							<Stack
								alignItems="center"
								justifyContent="space-between"
								sx={{ width: '100%' }}
								direction="row"
							>
								<Typography
									variant="body1"
									sx={{
										[theme.breakpoints.down(420)]: {
											fontSize: 12,
										},
									}}
								>
									{moment(startTime).format('LL')} (
									{moment(startTime).format('LT')})
								</Typography>
								<ArrowDropDownOutlinedIcon sx={{ ml: 2 }} />
							</Stack>
						</DatePickerVisiblePart>
					</DatePickerWrapper>
				</Box>
			</Stack>

			<Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 1 }}>
				<Title variant="h6" sx={{ mb: 2, flexShrink: 0, width: '80px' }}>
					Ending
				</Title>

				<Box sx={{ flexGrow: 1 }}>
					<DatePickerWrapper>
						<DateTimePicker
							disablePast
							value={endTime}
							minDate={startTime}
							onChange={(newValue) => handleChangeEndDateTime(newValue)}
							renderInput={(params) => <DatePickerTextField {...params} />}
						/>
						<DatePickerVisiblePart>
							<Stack
								alignItems="center"
								justifyContent="space-between"
								sx={{ width: '100%' }}
								direction="row"
							>
								<Typography
									variant="body1"
									sx={{
										[theme.breakpoints.down(420)]: {
											fontSize: 12,
										},
									}}
								>
									{moment(endTime).format('LL')} ({moment(endTime).format('LT')})
								</Typography>
								<ArrowDropDownOutlinedIcon sx={{ ml: 2 }} />
							</Stack>
						</DatePickerVisiblePart>
					</DatePickerWrapper>
				</Box>
			</Stack>
		</Fragment>
	);
}
