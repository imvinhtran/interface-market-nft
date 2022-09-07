import { styled, Box, keyframes } from '@mui/material';

const ani = keyframes`
0% {
	stroke-dasharray: 378 503;
	stroke-dashoffset: 0;
	animation-timing-function: cubic-bezier(0.895, 0.03, 0.685, 0.22);
}
49.999% {
	stroke-dasharray: 0 503;
	stroke-dashoffset: 0;
}
50.001% {
	stroke-dasharray: 0 503;
	stroke-dashoffset: -503;
	animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
}
100% {
	stroke-dasharray: 378 503;
	stroke-dashoffset: -125;
}
`;

const rot = keyframes`
to {
	transform: rotate(1turn);
}
`;

// const stroke = keyframes`
// 100% {
// 	stroke-dashoffset: 0;
// }
// `;

export const ProgressCheckmarkWrapper = styled(Box)(({ theme }) => ({
	width: 42,
	height: 42,
	'@keyframes stroke': {
		'100% ': {
			strokeDashoffset: 0,
		},
	},

	'.progress': {
		position: 'relative',
		width: 'fit-content',
		'&-number': {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			marginTop: '-3px',
		},

		svg: {
			width: 42,
			height: 42,
		},

		g: {
			animation: `${rot} 5s linear infinite`,
		},

		circle: {
			fill: 'none',
			stroke: '#379dde',
			strokeWidth: 6,
			animation: `${ani} 4s linear infinite reverse, ${rot} 16s steps(4, start) infinite reverse`,
		},
	},

	'.success': {
		position: 'relative',

		'&-checkmark': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: 35,
			height: 35,
			borderRadius: '50%',
			display: 'block',
			strokeWidth: 2,
			stroke: '#4bb71b',
			strokeMiterlimit: 10,
			boxShadow: 'inset 0px 0px 0px #4bb71b',
			margin: '0 auto',

			'.checkmark__circle': {
				strokeDasharray: 166,
				strokeDashoffset: 166,
				strokeWidth: 2,
				strokeMiterlimit: 10,
				stroke: '#4bb71b',
				fill: 'transparent',
			},

			'.checkmark__check': {
				transformOrigin: '50% 50%',
				strokeDasharray: 48,
				strokeDashoffset: 48,
			},
		},
	},
}));
