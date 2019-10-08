import React from "react";
const initialState = {
  todos: [],
  loading: false
};
const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return {
        ...state,
        todos: state.todos.concat(action.payload),
        loading: false
      };
    case "fetched":
      return { ...state, todos: action.payload, loading: false };
    case "loading":
      return { ...state, loading: true };
    case "removed":
      return {
        ...state,
        loading: false,
        todos: state.todos.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
};

const submitFile = async ({ attachment, id }) => {
  const data = new FormData();
  data.append("file", attachment, attachment.name);
  data.append("id", id);
  const response = await fetch("/api/todo", {
    method: "PUT",
    body: data
  });
  return response;
};

const submitTodo = async (
  { attachment, description, id, checked },
  dispatch
) => {
  dispatch({ type: "loading" });
  let todo = {
    description,
    id,
    checked
  };
  let response = await fetch("/api/todo", {
    method: "POST",
    body: JSON.stringify({ description, id, checked }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (attachment != null) {
    response = await submitFile({ attachment, id });
    const json = await response.json();
    todo.attachment = {
      name: json.name,
      url: json.downloadUrl
    };
  }
  dispatch({ type: "add", payload: { todo } });
};

const getTodos = async (param, dispatch) => {
  dispatch({ type: "loading", payload: true });
  const getUrl = () => {
    let url = "/api/todos";
    switch (param) {
      case "all":
        return `${url}?todos=all`;
      case "done":
        return `${url}?todos=done`;
      default:
        return url;
    }
  };
  const response = await fetch(getUrl());
  const todos = await response.json();
  dispatch({ type: "fetched", payload: todos });
};

const markAsDone = async (todo, dispatch) => {
  dispatch({ type: "loading", payload: true });
  try {
    await fetch("/api/todo", {
      method: "PATCH",
      body: JSON.stringify({ id: todo.id }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    dispatch({ type: "removed", payload: { id: todo.id } });
  } catch (e) {
    console.error(e);
    dispatch({ type: "loading", payload: false });
  }
};

const TodoContext = React.createContext(null);
export const TodoStateProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(
    () => {
      getTodos(null, dispatch);
    },
    [dispatch]
  );

  return (
    <TodoContext.Provider
      value={{
        submitTodo: todo => submitTodo(todo, dispatch),
        markAsDone: todo => markAsDone(todo, dispatch),
        getTodos: param => getTodos(param, dispatch),
        state
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
