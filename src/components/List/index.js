import React from "react";
import { List, Segment } from "semantic-ui-react";
import TodoContext from "@/TodoContext";
import TodoItem from "@/components/Item";

const TodoList = () => {
  const { state } = React.useContext(TodoContext);
  return (
    <Segment basic loading={state.loading}>
      <List relaxed="very" divided verticalAlign="middle">
        {state.todos
          .reverse()
          .map(item => <TodoItem {...item} key={item.id} />)}
      </List>
    </Segment>
  );
};

export default TodoList;
