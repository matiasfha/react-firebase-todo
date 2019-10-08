import React from 'react';
import { Button, Label } from 'semantic-ui-react';


const FileButton = ({ onChange, value }) => {
  const inputRef = React.useRef()
  const [ file, setFile ] = React.useState(null)

  React.useEffect(() => {
    if(value===null){
      setFile(null)
    }
  }, [value])

  const handleOnChange = (e) => {
    onChange({
      file: inputRef.current.files[0]
    })
    setFile(inputRef.current.files[0])
  }

  const ButtonLabel = () => {
    let label = 'Select file';
    if(file) {
      label = file.name
    }
    return (
      <Label as="label" style={{ cursor: 'pointer' }} basic children={label} pointing="left"/>
    )
  }

  return (
    <>
      <Button
        as="div"
        htmlFor="fileInput"
        labelPosition="right"
        onClick={() => inputRef.current.click()}
      >
        <Button type="button" icon="upload" title="Upload a file"/>
        <ButtonLabel />
      </Button>
      <input hidden ref={inputRef} type="file" id="fileInput" onChange={handleOnChange} />
    </>
  )
}

export default FileButton
