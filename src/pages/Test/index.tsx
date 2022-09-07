import React from 'react';

import { Box } from '@mui/material';

export default function App() {
	return (
		<Box
			sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
		>
			<Box
				sx={{
					width: 600,
					height: 800,
					backgroundColor: 'teal',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					// transform: 'scale(2)',
				}}
			>
				<Box
					sx={{
						width: 400,
						height: 200,
						backgroundColor: 'violet',
						opacity: 0.5,
						transform: 'scale(1.5, 4)',
					}}
				>
					<img
						src="https://res.cloudinary.com/dyh2c5n8i/image/upload/v1652843474/nft/QmemymnZDHUgtbx698Z1z64wqhmxWxRUuwHPscqfG14LU5.webp"
						width="100%"
						height="100%"
						alt="sada"
						style={{ objectFit: 'cover', transform: 'scaleX(2.666666)' }}
					/>
				</Box>
			</Box>
		</Box>
	);
}
