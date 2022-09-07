/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from '@mui/material';
import React, { useContext } from 'react';
import Footer from './Footer';
import Head from './Head';
import Main from './Main';
import TestContainer, { TestContext } from './TestContext';

export default function TestGrid() {
	console.log('render Index()');

	return (
		<Container maxWidth="xl" sx={{ pt: 10 }}>
			<img
				loading="lazy"
				src="https://res.cloudinary.com/dyh2c5n8i/image/upload/w_600,h_300/q_auto:best,f_auto/v1652841649/collections/1652841648675.webp"
				alt="test"
				width="600"
				height="300"
			/>
			<img
				loading="lazy"
				src="https://res.cloudinary.com/dyh2c5n8i/image/upload/v1652841649/collections/1652841648675.webp"
				alt="test"
				width="600"
				height="300"
			/>
			<TestContainer>
				<Head />
				<Main />
				<Footer />
			</TestContainer>
		</Container>
	);
}
