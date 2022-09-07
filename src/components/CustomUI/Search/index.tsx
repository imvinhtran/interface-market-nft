import React from 'react';
// styled
import { IconSearch, InputSearch, InputWrapper } from './styled';

function Search() {
	return (
		<>
			<InputWrapper direction="row">
				<IconSearch>
					<img src="/search.png" alt="search" />
				</IconSearch>
				<InputSearch type="text" placeholder="Search" />
			</InputWrapper>
		</>
	);
}

export default Search;
