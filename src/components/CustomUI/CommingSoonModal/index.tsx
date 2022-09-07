/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, Fragment, useEffect } from 'react';
import { motion } from 'framer-motion';
//mui
import CloseIcon from '@mui/icons-material/Close';
//styled
import {
	ModalClose,
	ImgPoint,
	ModalOverlay,
	ModalContain,
	SpinnerBox,
	ComingSoonImg,
} from './styled';
// import PointLogoLoading from 'assets/icons/point_loading.json';
// images
import ComingSoonImage from 'assets/images/home/coming-soon.webp';

const spinTransition = {
	repeat: Infinity,
	ease: 'linear',
	duration: 10,
};

const ModalComingSoon = () => {
	const [open, setOpen] = useState<boolean>(true);

	useEffect(() => {
		const escFunction = (event: any) => {
			if (event.key === 'Escape') {
				//Do whatever when esc is pressed
				setOpen(false);
				window.removeEventListener('keydown', escFunction);
			}
		};

		window.addEventListener('keydown', escFunction, { passive: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return open ? (
		<ModalOverlay>
			<ModalContain>
				<ModalClose onClick={() => setOpen(false)}>
					<CloseIcon
						sx={{
							fontSize: '1.5rem',
							color: 'white',
							cursor: 'pointer',
						}}
					/>
				</ModalClose>
				<SpinnerBox animate={{ rotate: 360 }} transition={spinTransition}>
					<ImgPoint sx={{ position: 'absolute', left: '50%' }} />
					<ImgPoint sx={{ position: 'absolute', left: '10%', bottom: '20%' }} />
					<ImgPoint sx={{ position: 'absolute', right: '10%', bottom: '20%' }} />
				</SpinnerBox>
				<ComingSoonImg src={ComingSoonImage} alt="coming soon" />
			</ModalContain>
		</ModalOverlay>
	) : (
		<Fragment />
	);
};

export default React.memo(ModalComingSoon);
