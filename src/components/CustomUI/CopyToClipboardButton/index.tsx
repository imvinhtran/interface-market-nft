import React, { useEffect, useState } from 'react';
// mui
import { Box, Stack, Tooltip } from '@mui/material';
// libs
import CopyToClipboard from 'react-copy-to-clipboard';
//images
import CopyIcon from 'assets/icons/copy.webp';

export interface ICopyToClipboardButtonProps {
	text: string | null | undefined;
	placementTooltip:
		| 'top'
		| 'bottom-end'
		| 'bottom-start'
		| 'bottom'
		| 'left-end'
		| 'left-start'
		| 'left'
		| 'right-end'
		| 'right-start'
		| 'right'
		| 'top-end'
		| 'top-start'
		| undefined;
}

export default function CopyToClipboardButton({
	text,
	placementTooltip,
}: ICopyToClipboardButtonProps) {
	const [isOpenTooltipCopy, setIsOpenTooltipCopy] = useState(false);

	useEffect(() => {
		if (isOpenTooltipCopy) {
			let id = setTimeout(() => {
				setIsOpenTooltipCopy(false);
			}, 500);
			return () => clearTimeout(id);
		}
	}, [isOpenTooltipCopy]);

	return (
		<CopyToClipboard
			text={text ?? ''}
			onCopy={() => {
				setIsOpenTooltipCopy(true);
			}}
		>
			<Tooltip
				placement={placementTooltip}
				arrow
				PopperProps={{
					disablePortal: true,
				}}
				open={isOpenTooltipCopy}
				disableFocusListener
				disableHoverListener
				disableTouchListener
				title="Copied !"
				sx={{ cursor: 'pointer' }}
			>
				<Stack direction="row" width="fit-content">
					<Box sx={{ width: '20px' }}>
						<img
							src={CopyIcon}
							alt="icon copy"
							width="100%"
							style={{ display: 'block' }}
						/>
					</Box>
				</Stack>
			</Tooltip>
		</CopyToClipboard>
	);
}
