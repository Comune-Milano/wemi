import React from 'react';
import TextArea from 'components/ui2/TextArea';

const Note = ({
	Value,
	UpdateValue,
	Modifica
}) => (
		<TextArea
			readOnly={!Modifica.note}
			label="Indicazioni della redazione WeMi"
			color="blue"
			hoverColor="blue"
			inputValue={Value}
			onChange={UpdateValue}
			bgColor="lightYellow"
		/>
	);

export default Note;