import React from 'react'
import TextArea from 'components/ui2/TextArea'

const Note = ({ Value }) => {

  return (
    <TextArea
      readOnly={true}
      colorReadOnly="blue"
      label="Note"
      color="blue"
      hoverColor="blue"
      inputValue={Value}
    />
  )
}

export default Note;