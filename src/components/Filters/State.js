import React from "react";
import { Dropdown } from "semantic-ui-react";
import TodoContext from "@/TodoContext";

const stateOptions = [
  {
    key: "All",
    text: "All",
    value: "all",
    label: { color: "red", empty: true, circular: true }
  },
  {
    key: "Done",
    text: "Done",
    value: "done",
    label: { color: "blue", empty: true, circular: true }
  },
  {
    key: "Reset",
    text: "Reset",
    value: "",
    label: { color: "black", empty: true, circular: true }
  }
];

const State = () => {
  const { getTodos } = React.useContext(TodoContext);
  const onClick = (_, data) => {
    getTodos(data.value);
  };
  return (
    <Dropdown
      text="Filter By State"
      icon="filter"
      floating
      labeled
      button
      className="icon"
    >
      <Dropdown.Menu>
        {stateOptions.map(option => (
          <Dropdown.Item key={option.value} {...option} onClick={onClick} />
        ))}

      </Dropdown.Menu>
    </Dropdown>
  );
};
export default State;
