/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo, useContext, useEffect, useLayoutEffect, useRef } from 'react';
import { TestContext } from './TestContext';

const Main = () => {
	const { height } = useContext(TestContext);
	console.log('render Main()');
	console.log('Height', height);

	return <div style={{ height: height, backgroundColor: 'violet', width: 300 }}>Main</div>;
};

export default memo(Main);
