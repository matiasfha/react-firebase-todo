import React from "react";
import { Button, Label, Form } from "semantic-ui-react";
import uuid from "uuid/v4";
import TodoContext from "@/TodoContext";
import FileButton from "@/components/FileButton";

const TodoForm = () => {
  const { submitTodo } = React.useContext(TodoContext);
  const [state, setState] = React.useState({
    description: "",
    attachment: null,
    checked: false,
    stateFilter: null
  });
  const [error, setError] = React.useState(null);

  const onDescriptionChange = e => {
    setState({
      ...state,
      description: e.target.value
    });
  };

  const onFileChange = ({ file }) => {
    setState({
      ...state,
      attachment: file
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { description, attachment } = state;
    const addNewTodo = async () => {
      await submitTodo({
        description,
        attachment,
        checked: false,
        id: uuid()
      });
      setState({
        ...state,
        attachment: null,
        description: ""
      });
    };
    if (description === "") {
      return setError("description");
    }
    setError(null);
    return addNewTodo();
  };

  return (
    <Form size="large" onSubmit={handleSubmit}>
      <Form.Group width={16}>
        <Form.Input
          error={error === "description"}
          placeholder="Description"
          width={12}
          value={state.description}
          onChange={onDescriptionChange}
          onFocus={() => setError(null)}
        />
        <FileButton onChange={onFileChange} value={state.attachment} />
        <Button as="div" color="teal" type="submit" labelPosition="right">
          <Button icon="add" color="teal" type="submit" id="submitButton" />
          <Label
            as="label"
            basic
            children="Add"
            style={{ cursor: "pointer" }}
            htmlFor="submitButton"
            pointing="left"
          />
        </Button>
      </Form.Group>
    </Form>
  );
};

export default TodoForm;
