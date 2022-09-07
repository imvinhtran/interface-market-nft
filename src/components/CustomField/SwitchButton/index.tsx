import React from 'react';

import { Switch } from './styled';

export interface SwitchButtonProps {
	onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
}

// this switch learn from w3school
function SwitchButton({ onChange }: SwitchButtonProps) {
	const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event);
	};

	return (
		<Switch>
			<input type="checkbox" aria-checked="false" onChange={handleSwitch} />
			<span className="slider round"></span>
		</Switch>
	);
}

export default SwitchButton;
