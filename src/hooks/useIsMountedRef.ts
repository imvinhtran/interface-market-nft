import { useEffect, useRef } from 'react';

export default function useIsMountedRef() {
	const isMountedRef = useRef<boolean | null>(null);
	useEffect((): any => {
		isMountedRef.current = true;
		return () => (isMountedRef.current = false);
	});
	return isMountedRef;
}
