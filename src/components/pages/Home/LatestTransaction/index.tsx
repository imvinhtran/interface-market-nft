/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Fragment, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react.js';
import { Autoplay } from 'swiper';
import { useNavigate } from 'react-router-dom';
//mui
import { Avatar, Box, Link, Skeleton, Typography } from '@mui/material';
//styled
import {
	LatestTransactionBox,
	LatestTransactionContainer,
	LatestTransactionWrapper,
	UserAvatar,
} from './styled';
//api
import tradingApi from 'apis/historyApi';
//models
import { LatestTransaction as LatestTransactionModel } from 'models';
import moment from 'moment';
import { toast } from 'react-toastify';

export interface LatestTransactionProps {}

export const LatestTransaction = (props: LatestTransactionProps) => {
	const navigate = useNavigate();
	const [listLatest, setListLatest] = useState<LatestTransactionModel[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const res = await tradingApi.getLatestTransaction();
				setListLatest(res);
				setIsLoading(false);
			} catch (error: any) {
				toast.error(error.message);
			}
		})();
	}, []);

	const calTimeLeft = (createTime: string) => {
		const time = moment(createTime).fromNow();
		return time;
	};

	return (
		<Fragment>
			<LatestTransactionContainer>
				<LatestTransactionWrapper>
					{isLoading ? (
						<LatestTransactionBox>
							<Skeleton variant="circular" width={40} height={40} />
							<Box sx={{ flexGrow: 1 }}>
								<Skeleton width="80%" />
							</Box>

							<Skeleton width={100} />
						</LatestTransactionBox>
					) : (
						listLatest.length > 0 && (
							<Swiper
								direction={'vertical'}
								loop={true}
								autoplay={{ delay: 4000, disableOnInteraction: false }}
								modules={[Autoplay]}
								className="mySwiper"
							>
								{listLatest.map((item: LatestTransactionModel, index: number) => (
									<SwiperSlide key={index}>
										<LatestTransactionBox>
											<UserAvatar src={item.avatar} alt="user avatar" />
											<Typography sx={{ fontWeight: 600 }} noWrap>
												<span>{item.username}</span>
											</Typography>
											<Typography sx={{ flexGrow: 1 }} noWrap>
												purchased{' '}
												<a
													onClick={() =>
														navigate(`/detail/${item.itemId}`)
													}
												>
													{item.itemName}
												</a>{' '}
												at{' '}
												<span>
													{item.tokenPrice} {item.priceType.toUpperCase()}
												</span>
											</Typography>
											<Typography noWrap>
												{calTimeLeft(item.createdAt)}
											</Typography>
										</LatestTransactionBox>
									</SwiperSlide>
								))}
							</Swiper>
						)
					)}
				</LatestTransactionWrapper>
			</LatestTransactionContainer>
		</Fragment>
	);
};

export default LatestTransaction;
