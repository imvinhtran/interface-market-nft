/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
// mui
import { Container } from '@mui/material';

export interface IViewAllProps {}

export default function ViewAll(props: IViewAllProps) {
	let [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get('query');

	console.log('searchParams', searchParams);
	console.log('query', query);

	return (
		<Container maxWidth="xl">
			{/* <button onClick={() => setSearchParams({ query: 'ab' })}>add</button> */}
		</Container>
	);
}
