import React from 'react';
import { motion } from 'framer-motion';
// images
// import PointLogoLoading from 'assets/icons/point_loading.json';
// styled
import { CardContent, CardImage, CardText, NoItemCard, NoItemWrapper } from './styled';
import { Point } from 'components/CustomUI/LoadingPage/styled';

const spinTransition = {
	repeat: Infinity,
	ease: 'linear',
	duration: 10,
};

export interface NoItemProps {
	title: string;
	image: string;
}

function NoItem({ title, image }: NoItemProps) {
	return (
		<NoItemWrapper className="b">
			<NoItemCard>
				<motion.div
					style={{
						position: 'absolute',
						height: 170,
						width: 170,
						borderRadius: '50%',
					}}
					animate={{ rotate: 360 }}
					transition={spinTransition}
				>
					<Point
						sx={{
							left: '50%',
							backgroundColor: '#00BBDC',
							width: '12px',
							height: '12px',
						}}
					/>
					<Point
						sx={{
							left: '10%',
							bottom: '20%',
							backgroundColor: '#46FE96',
							width: '12px',
							height: '12px',
						}}
					/>
					<Point
						sx={{
							right: '10%',
							bottom: '20%',
							backgroundColor: '#C2EAFF',
							width: '12px',
							height: '12px',
						}}
					/>
				</motion.div>

				<CardContent className="a">
					<CardImage>
						<img src={image} alt="no item" />
					</CardImage>
					<CardText variant="body2">{title}</CardText>
				</CardContent>
			</NoItemCard>
		</NoItemWrapper>
	);
}

export default NoItem;
