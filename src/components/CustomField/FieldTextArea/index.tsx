/* eslint-disable @typescript-eslint/no-unused-vars */
// styled
import { TextArea } from './styled';

export interface FieldTextAreaProps {
	id?: string;
	rows: number;
	cols: number;
	registerHookForm: object;
	placeholder?: string;
}

FieldTextArea.defaultProps = {
	onChange: () => {},
};

function FieldTextArea({ id, rows, cols, registerHookForm, placeholder }: FieldTextAreaProps) {
	return (
		<>
			<TextArea
				id={id}
				rows={rows}
				cols={cols}
				{...registerHookForm}
				placeholder={placeholder}
			/>
		</>
	);
}

export default FieldTextArea;
