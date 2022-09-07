import React from 'react';
// styled
import { AnimationLine, CardImage, CardText, NoItemCard, NoItemWrapper } from './styled';

export interface NoItemProps {
	title: string;
	image: string;
}

function NoItem({ title, image }: NoItemProps) {
	return (
		<>
			<NoItemWrapper>
				<NoItemCard>
					<AnimationLine />
					<AnimationLine />
					<AnimationLine />
					<AnimationLine />
					<CardImage>
						<img src={image} alt="no item" />
					</CardImage>
					<CardText variant="body2" sx={{ color: 'white' }}>
						{' '}
						{title}
					</CardText>
				</NoItemCard>
			</NoItemWrapper>
		</>
	);
}

export default NoItem;
