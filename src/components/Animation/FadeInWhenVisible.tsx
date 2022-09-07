import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeInWhenVisibleProps {
	children: ReactNode;
}

function FadeInWhenVisible({ children }: FadeInWhenVisibleProps) {
	return (
		// <AnimatePresence>
		<motion.div
			initial={{ y: 10 }}
			animate={{ y: 0 }}
			exit={{ y: 10 }}
			transition={{
				duration: 1,
				type: 'spring',
				stiffness: 100,
			}}
		>
			{children}
		</motion.div>
		// </AnimatePresence>
	);
}

export default FadeInWhenVisible;
