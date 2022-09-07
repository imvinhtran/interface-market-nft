/* eslint-disable @typescript-eslint/no-unused-vars */
import advertiseApi from 'apis/advertiseApi';
import ButtonGradient from 'components/CustomUI/ButtonGradient';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, memo, useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { toast } from 'react-toastify';
import { GalleryContainer, MarqueeItemPrimary, MarqueeItemSecondary, ViewButton } from './styled';

const firstGallery = [
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/0x3b3ee1931dc30c1957379fac9aba94d1c48a5405:96443/964919b8',
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/TEZOS-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton:266426/82b41a68',
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/TEZOS-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton:297670/972e20d2',
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/TEZOS-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton:265459/cb5b35a2',
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/TEZOS-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton:261984/528d6b7b',
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/TEZOS-KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS:24875/e11d1809',
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/TEZOS-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton:275219/343c582f',
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/TEZOS-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton:292613/934e56c2',
];

const secondGallery = [
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/TEZOS-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton:264060/d19fb90f',
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/0x60f80121c31a0d46b5279700f9df786054aa5ee5:1080503/dc5cf712',
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/POLYGON-0xb4690c69e872955bdcd616a48ede18b6dae26628:33/7d4b1fc',
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/TEZOS-KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton:348409/e669aff9',
	'https://img.rarible.com/prod/image/upload/t_image_preview/prod-itemImages/0x60f80121c31a0d46b5279700f9df786054aa5ee5:442076/3f35dd65',
];

export interface GalleryItemProps {
	displayGallery: boolean | object;
	distance: string;
}

export interface MarqueeProps {
	listTokenId: any;
	isLoading: boolean;
}

export const MarqueeFirstItemRender = React.memo(({ item }: { item: any }) => {
	const [touch, setTouch] = useState<boolean>(false);

	return (
		<MarqueeItemPrimary
			onMouseEnter={() => setTouch(true)}
			onMouseLeave={() => setTouch(false)}
		>
			<img src={item} alt="gallery item" />
			<AnimatePresence>
				{touch && (
					<motion.div
						initial={{ y: window.innerWidth < 1068 ? -80 : -125, opacity: 0 }}
						animate={{ y: window.innerWidth < 1068 ? -90 : -150, opacity: 1 }}
						exit={{ y: window.innerWidth < 1068 ? -80 : -125, opacity: 0 }}
						transition={{ duration: 1, type: 'spring' }}
					>
						<ViewButton>
							<ButtonGradient>View now</ButtonGradient>
						</ViewButton>
					</motion.div>
				)}
			</AnimatePresence>
		</MarqueeItemPrimary>
	);
});

export const MarqueeSecondItemRender = React.memo(({ item }: { item: any }) => {
	const [touch, setTouch] = useState<boolean>(false);

	return (
		<MarqueeItemSecondary
			onMouseEnter={() => setTouch(true)}
			onMouseLeave={() => setTouch(false)}
		>
			<img src={item} alt="gallery item" />
			<AnimatePresence>
				{touch && (
					<motion.div
						initial={{ y: window.innerWidth < 1068 ? -50 : -125, opacity: 0 }}
						animate={{ y: window.innerWidth < 1068 ? -60 : -150, opacity: 1 }}
						exit={{ y: window.innerWidth < 1068 ? -50 : -125, opacity: 0 }}
						transition={{ duration: 1, type: 'spring' }}
					>
						<ViewButton>
							<ButtonGradient>View now</ButtonGradient>
						</ViewButton>
					</motion.div>
				)}
			</AnimatePresence>
		</MarqueeItemSecondary>
	);
});

const GalleryItem = ({ displayGallery, distance }: GalleryItemProps) => {
	const [listVideo, setListVideo] = useState<any>([]);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		(async () => {
			try {
				setIsLoading(true);
				const list = await advertiseApi.getListItem();
				setListVideo(list);
				setIsLoading(false);
			} catch (error: any) {
				setIsLoading(false);
				toast.error(error.message);
			}
		})();
	}, []);
	return (
		<GalleryContainer
			sx={{
				marginTop: distance,
				opacity: displayGallery ? 0.999 : 0.001,
				transform: displayGallery ? 'translateY(0)' : 'translateY(50px)',
				transition: displayGallery
					? 'transform .6s ease-out,opacity .6s'
					: 'transform .6s,opacity .6s',
			}}
		>
			<Fragment>
				<Marquee gradient={false} speed={40} pauseOnHover>
					{firstGallery.map((item: any, index: number) => (
						<MarqueeFirstItemRender key={index} item={item} />
					))}
				</Marquee>
				<Marquee gradient={false} speed={50} pauseOnHover>
					{secondGallery.map((item: any, index: number) => (
						<MarqueeSecondItemRender key={index} item={item} />
					))}
				</Marquee>
			</Fragment>
		</GalleryContainer>
	);
};

export default memo(GalleryItem);
