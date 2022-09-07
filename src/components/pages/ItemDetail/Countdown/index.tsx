/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
	CountdownContain,
	ForBitAuctionEnd,
	TimeArticle,
	TimeTitle,
	TimeValue,
	TitleArticle,
} from './styled';
import { useDispatch } from 'react-redux';

export interface ICountdownProps {
	endTime: any;
	title: string;
}

export default function Countdown({ endTime, title }: ICountdownProps) {
	const dispatch = useDispatch();
	const [days, setDays] = useState('00');
	const [hours, setHours] = useState('00');
	const [minutes, setMinutes] = useState('00');
	const [seconds, setSeconds] = useState('00');

	useEffect(() => {
		const endDate = endTime * 1000;
		const interval = setInterval(() => {
			const today = new Date().getTime();
			if (endDate > today) {
				const timeDiff = endDate - today;

				const seconds = 1000;
				const minutes = seconds * 60;
				const hours = minutes * 60;
				const days = hours * 24;

				let timeDays: any = Math.floor(timeDiff / days);
				let timeHours: any = Math.floor((timeDiff % days) / hours);
				let timeMinutes: any = Math.floor((timeDiff % hours) / minutes);
				let timeSeconds: any = Math.floor((timeDiff % minutes) / seconds);

				timeDays = timeDays < 10 ? '0' + timeDays : timeDays;
				timeHours = timeHours < 10 ? '0' + timeHours : timeHours;
				timeMinutes = timeMinutes < 10 ? '0' + timeMinutes : timeMinutes;
				timeSeconds = timeSeconds < 10 ? '0' + timeSeconds : timeSeconds;

				setDays(timeDays);
				setHours(timeHours);
				setMinutes(timeMinutes);
				setSeconds(timeSeconds);
			}
			//turn off loading after get time for countdown
			// dispatch(hideLoading());
		}, 1000);

		return () => clearInterval(interval);
	});

	return (
		<ForBitAuctionEnd>
			<TitleArticle>{title}</TitleArticle>
			<CountdownContain>
				<TimeArticle>
					<TimeValue>{days}</TimeValue>
					<TimeTitle>Days</TimeTitle>
				</TimeArticle>
				<TimeArticle>
					<TimeValue sx={{ padding: '0px 8px 15px 8px' }}>:</TimeValue>
				</TimeArticle>
				<TimeArticle>
					<TimeValue>{hours}</TimeValue>
					<TimeTitle>Hours</TimeTitle>
				</TimeArticle>
				<TimeArticle>
					<TimeValue sx={{ padding: '0px 8px 15px 8px' }}>:</TimeValue>
				</TimeArticle>
				<TimeArticle>
					<TimeValue>{minutes}</TimeValue>
					<TimeTitle>Minutes</TimeTitle>
				</TimeArticle>
				<TimeArticle>
					<TimeValue sx={{ padding: '0px 8px 15px 8px' }}>:</TimeValue>
				</TimeArticle>
				<TimeArticle>
					<TimeValue>{seconds}</TimeValue>
					<TimeTitle>Seconds</TimeTitle>
				</TimeArticle>
			</CountdownContain>
		</ForBitAuctionEnd>
	);
}
