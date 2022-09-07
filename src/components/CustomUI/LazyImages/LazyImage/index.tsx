import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
// import LoadingGif from 'assets/images/home/loadingNFT.gif';

// const placeHolder =
// ('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=');
const placeHolder = '/loadingNFT.gif';

const Image = styled.img`
	@keyframes loaded {
		0% {
			opacity: 0.1;
		}
		25% {
			opacity: 0.25;
		}
		50% {
			opacity: 0.5;
		}
		75% {
			opacity: 0.75;
		}
		100% {
			opacity: 1;
		}
	}

	&.loaded:not(.has-error) {
		animation: loaded 500ms ease-in-out;
	}

	&.has-error {
		content: url(${placeHolder});
	}
`;

export interface LazyImageNFTProps {
	src: string;
	alt: string;
	style?: object;
}

function LazyImage({ src, alt, style }: LazyImageNFTProps) {
	const [imageSrc, setImageSrc] = useState(placeHolder);
	const [imageRef, setImageRef] = useState<any>();

	const onLoad = (event: any) => {
		event.target.classList.add('loaded');
	};

	const onError = (event: any) => {
		event.target.classList.add('has-error');
	};

	useEffect(() => {
		let observer: any = null;
		let didCancel = false;

		if (imageRef && imageSrc !== src) {
			if (IntersectionObserver) {
				observer = new IntersectionObserver(
					(entries) => {
						entries.forEach((entry) => {
							if (
								!didCancel &&
								(entry.intersectionRatio > 0 || entry.isIntersecting)
							) {
								setImageSrc(src);
								observer.unobserve(imageRef);
							}
						});
					},
					{
						threshold: 0.01,
						rootMargin: '75%',
					}
				);
				observer.observe(imageRef);
			} else {
				// Old browsers fallback
				setImageSrc(src);
			}
		}
		return () => {
			didCancel = true;
			// on component cleanup, we remove the listner
			if (observer && observer.unobserve) {
				observer.unobserve(imageRef);
			}
		};
	}, [src, imageSrc, imageRef]);
	return (
		<Image
			loading="lazy"
			style={style}
			ref={setImageRef}
			src={imageSrc}
			alt={alt}
			onLoad={onLoad}
			onError={onError}
		/>
	);
}

export default memo(LazyImage);
