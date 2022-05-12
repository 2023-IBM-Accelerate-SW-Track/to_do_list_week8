import React, { Component } from "react";
import Todos from "../component/todos";
import AddTodo from "../component/AddTodo";
import "../pages/Home.css";
import { Card, CardMedia, CardContent } from "@material-ui/core";

class Home extends Component {
  state = {
    todos: [],
  };
  deleteTodo = (id) => {
    const todos = this.state.todos.filter((todo) => {
      return todo.id !== id;
    });
    this.setState({
      todos: todos,
    });
  };
  addTodo = (todo) => {
    todo.id = Math.random();
    let todos = [...this.state.todos, todo];
    this.setState({
      todos: todos,
    });
  };
  render() {
    return (
      <div className="Home">
        <h1>Todo's </h1>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
        <AddTodo addTodo={this.addTodo} />
      </div>
    );
  }
}

export default Home;
