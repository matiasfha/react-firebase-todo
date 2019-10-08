import React from "react";
import { Segment, Grid, Header } from "semantic-ui-react";
import { TodoStateProvider } from "./TodoContext";
import TodoApp from "./TodoApp";
function App() {
  return (
    <Grid container centered style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column stretched>
        <Header as="h2" color="teal" textAlign="center">
          Firebase TODO{" "}
        </Header>
        <Segment stacked>
          <TodoStateProvider>
            <TodoApp />
          </TodoStateProvider>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default App;
