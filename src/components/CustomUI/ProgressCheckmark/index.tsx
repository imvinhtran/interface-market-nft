import { Box } from '@mui/material';
import * as React from 'react';
// styled
import { ProgressCheckmarkWrapper } from './styled';

export interface IProgressCheckmarkProps {
	isSuccess: boolean;
	stepNumber: number;
}

export default function ProgressCheckmark({ isSuccess, stepNumber }: IProgressCheckmarkProps) {
	return (
		<ProgressCheckmarkWrapper>
			{isSuccess ? (
				<Box className="success">
					<svg
						className="success-checkmark"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 52 52"
					>
						<circle
							className="checkmark__circle"
							style={{
								animation: 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards',
							}}
							cx={26}
							cy={26}
							r={25}
							fill="none"
						/>
						<path
							className="checkmark__check"
							style={{
								animation:
									'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards',
							}}
							fill="none"
							d="M14.1 27.2l7.1 7.2 16.7-16.8"
						/>
					</svg>
				</Box>
			) : (
				<Box className="progress">
					<p className="progress-number">{stepNumber}</p>
					<svg viewBox="-100 -100 200 200">
						<g>
							<circle r="80" />
						</g>
					</svg>
				</Box>
			)}
		</ProgressCheckmarkWrapper>
	);
}
