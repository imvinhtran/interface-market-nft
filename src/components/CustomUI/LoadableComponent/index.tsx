import React, { Suspense } from 'react';

const Loadable = (Component: any) => (props: any) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	return (
		<Suspense fallback={<div></div>}>
			<Component {...props} />
		</Suspense>
	);
};

export default Loadable;
