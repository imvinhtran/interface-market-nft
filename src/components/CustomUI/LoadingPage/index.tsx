import { motion } from 'framer-motion';
import React from 'react';
import { Point, LoadingContent, LoadingPageStyled, ImgLoading } from './styled';
import LogoSpaceX from 'assets/images/home/logoSpaceX.webp';

const spinTransition = {
	loop: Infinity,
	ease: 'linear',
	duration: 5,
};
export default function App() {
	return (
		<LoadingPageStyled>
			<LoadingContent>
				<motion.div
					style={{
						position: 'absolute',
						height: 216,
						width: 216,
						borderRadius: '50%',
						zIndex: 1001,
					}}
					animate={{ rotate: 360 }}
					transition={spinTransition}
				>
					<Point sx={{ left: '50%', backgroundColor: '#00BBDC' }} />
					<Point sx={{ left: '10%', bottom: '20%', backgroundColor: '#46FE96' }} />
					<Point sx={{ right: '10%', bottom: '20%', backgroundColor: '#C2EAFF' }} />
				</motion.div>
				<ImgLoading src={LogoSpaceX} alt="loading space" />
			</LoadingContent>
		</LoadingPageStyled>
	);
}
