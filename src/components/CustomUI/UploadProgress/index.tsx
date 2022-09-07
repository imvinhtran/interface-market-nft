import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function LinearBuffer({ isCompleted }: { isCompleted: boolean }) {
	const [progress, setProgress] = React.useState(0);
	const [buffer, setBuffer] = React.useState(10);

	const progressRef = React.useRef(() => {});
	React.useEffect(() => {
		progressRef.current = () => {
			if (!isCompleted) {
				setProgress(100);
				setBuffer(100);
			} else {
				if (progress > 100) {
					setProgress(0);
					setBuffer(10);
				} else {
					const diff = Math.random() * 5;
					const diff2 = Math.random() * 5;
					setProgress(progress + diff);
					setBuffer(progress + diff + diff2);
				}
			}
		};
	});

	React.useEffect(() => {
		const timer = setInterval(() => {
			progressRef.current();
		}, 500);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<Box sx={{ width: '100%' }}>
			<LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
		</Box>
	);
}
