import { ReactNode } from 'react';
import React from 'react';
// styled
import { ButtonStyled } from './styled';

export interface ButtonGradientProps {
	children: ReactNode;
	onClick?: VoidFunction;
	type?: 'button' | 'submit' | 'reset' | undefined;
	sx?: object;
	disabled?: boolean;
}

function ButtonGradient({ children, onClick, type, sx, disabled = false }: ButtonGradientProps) {
	return (
		<ButtonStyled sx={sx} type={type} onClick={onClick} disabled={disabled}>
			{children}
		</ButtonStyled>
	);
}

export default ButtonGradient;
