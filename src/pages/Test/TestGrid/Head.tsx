/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useContext, useEffect, useRef } from 'react';
import { TestContext } from './TestContext';

const Head = () => {
	const ref = useRef<HTMLDivElement>(null);
	console.log('render Head()');

	const { handleSetHeight } = useContext(TestContext);

	// useEffect(() => {
	// 	if (ref.current) {
	// 		handleSetHeight(ref.current.clientHeight);
	// 	}
	// }, []);
	const handleRender = () => {
		handleSetHeight(300);
	};

	return (
		<div
			ref={ref}
			style={{ width: 300, height: 300, background: 'teal' }}
			onClick={handleRender}
		>
			Head
		</div>
	);
};

export default React.memo(Head);
