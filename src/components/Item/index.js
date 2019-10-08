import React from "react";
import { Button, Checkbox, List, Icon } from "semantic-ui-react";
import cx from "classnames";
import TodoContext from "@/TodoContext";
import styles from "@/styles.module.css";

const TodoItem = ({ attachment, description, checked, id }) => {
  const { markAsDone } = React.useContext(TodoContext);
  const [state, setState] = React.useState(checked);
  const onChecked = () => {
    setState(!state);
    markAsDone({ id });
  };
  const RightContent = () => {
    return (
      <List.Content floated="right">
        <Button as="div" labelPosition="right">
          <Button color="teal" as="a" href={attachment.url} target="_blank">
            <Icon name="attach" />
            Download {attachment.name}
          </Button>
        </Button>
      </List.Content>
    );
  };
  return (
    <List.Item>
      {attachment && <RightContent />}
      <List.Content>
        <Checkbox
          label={description}
          checked={state}
          onChange={onChecked}
          className={cx({ [styles.itemDone]: checked })}
        />
      </List.Content>
    </List.Item>
  );
};

export default TodoItem;
