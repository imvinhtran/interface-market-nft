// styled
import { Input } from './styled';

export interface FieldInputProps {
	id?: string;
	type: string;
	registerHookForm?: object;
	placeholder?: string;
	value?: any;
	onChange: any;
	className?: string;
	readOnly?: boolean;
	sx?: any;
	otherProps?: any;
}

FieldInput.defaultProps = {
	onChange: (value: any) => {},
};

function FieldInput({
	id,
	type,
	registerHookForm,
	placeholder,
	value,
	onChange,
	className,
	readOnly,
	sx,
	otherProps,
}: FieldInputProps) {
	return (
		<Input
			type={type}
			step="any"
			className={className}
			{...registerHookForm}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			sx={sx}
			readOnly={readOnly}
			autoComplete="off"
			autoCorrect="off"
			{...otherProps}
		/>
	);
}

export default FieldInput;
