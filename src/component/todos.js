import React from "react";
import "../component/todos.css";
import { Button } from "@material-ui/core";
import { List, Card, CardContent, CardActions } from "@material-ui/core";
import { DeleteIcon } from "@material-ui/icons/Delete";

const Todos = ({ todos, deleteTodo }) => {
  const todoList = todos.length ? (
    todos.map((todo) => {
      return (
        <List key={todo.id}>
          <Card>
            <CardContent>
              <span style={{ padding: "50px" }}>{todo.content}</span>
              <CardActions>
                <Button
                  startIcon={DeleteIcon}
                  variant="outlined"
                  onClick={() => {
                    deleteTodo(todo.id);
                  }}
                >
                  Mark Complete
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </List>
      );
    })
  ) : (
    <p>You have no todo's left </p>
  );
  return (
    <div className="todoCollection" style={{ padding: "10px" }}>
      {todoList}
    </div>
  );
};

export default Todos;
