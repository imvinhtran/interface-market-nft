/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useMemo } from 'react';

interface TestValue {
	// render: boolean;
	// handleRender: VoidFunction;
	height: number;
	handleSetHeight: Function;
}

export const TestContext = React.createContext<TestValue>({
	// render: false,
	// handleRender: () => {},
	height: 0,
	handleSetHeight: () => {},
});

const TestContainer: React.FC = ({ children }) => {
	const [render, setRender] = useState<boolean>(false);
	const [height, setHeight] = useState<number>(0);

	const handleRender = () => {
		setRender(!render);
	};

	const handleSetHeight = (h: number) => {
		setHeight(h);
	};
	const value = useMemo(() => ({ height, handleSetHeight }), [height]);

	return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export default TestContainer;
