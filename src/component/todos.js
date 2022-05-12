import React from "react";
import "../component/todos.css";
import { List, Card, CardContent } from "@material-ui/core";

const Todos = ({ todos, deleteTodo }) => {
  const todoList = todos.length ? (
    todos.map((todo) => {
      return (
        <List key={todo.id}>
          <Card>
            <CardContent>
              <span style={{ padding: "50px" }}>{todo.content}</span>
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
