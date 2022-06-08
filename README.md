# Project Week 2: To-do list application (Cont.)
## Introduction
As of now, you have completed Project Week 1 and should now have a React Application that can navigate to an **About me** page and a **Home** page currently hosting the Todo List Application that we will continue to build upon for Project Week 2. For Project Week 2, Look to implement more Material UI components to the front-end of your to-do list web application to give it a sleek and modern appearance. Aside from styling, A typical user wants to be able to use a to-do list to organize tasks. Keeping user stories in mind when designing applications helps determine important features. We encourage you to take a unique approach to this lab as there is no one right answer. 
- [Material Design](https://material.io/design/introduction) is a design system that can guide you on what UI decisions to make if you would like to explore best practices, but functionality is the key focus of the lab.
- No back-end is required for this lab, all data (tasks) should live in the front-end.

## Requirements
Feature requirements (Week 2 task is complete when you):
+ Provide the date and time of item addition
+ Allow users to mark items as complete
+ Remove completed items from list
+ Validate there are no duplicated items

Implementation requirements:
+ Use [**Material UI components**](https://material-ui.com/) at least once throughout the app
+ Use Javascript's list.map function at least once to manipulate list items
+ Implement at least one **functional component**

Hints (Useful Resources):
+ Click [**here**](https://reactjs.org/docs/lists-and-keys.html) for an example on utilizing the list.map function

## Instructions

### TO-DO List APP
1. In this step, we will be adding the feature to display the date and time an item was added along with its task to the user. Also, we will be implementing a new component to display each item in the Todo list.
      + Navigate to `src/components/AddTodo.js`
        1. In the Constructor method, initialize a new property set to nothing to represent the current date 
        2. In the handleChange function, place the new date property and update the value using `Date().toLocaleString('en-US')` method
        3. In the handleSubmit function, make sure to set the new date property back to null after passing the user values to the addTodo function
      + Navigate to `src/component/todos.js`
        1. import ListItemButton and ListItemText components from the material UI library
        2. Within the Card component, substitute the CardContent component with a ListItemButton Component
            + **Before:**
               ```
                  <CardContent>
                    <span style={{ padding: "50px" }}>{todo.content}</span>
                  </CardContent>
               ```
            + **After:**
               ```
                  <ListItemButton component="a" href="#simple-list">
                    <ListItemText primary={todo.content}/>
                  </ListItemButton>
                ```
        3. Within the ListItemText component, add the secondary property next to the primary property to display the date for each task
        4. (optional) Add `style={{marginTop:10}}` to the Card component to give space between each item in the Todo list and avoid item cards from overlapping each other

2. In this step, we will be adding the checkbox feature to correspond to a task being completed
      + Navigate to `src/component/todos.js`
        1. import Checkbox from the material UI library
        2. Within the ListItemButton component, Add a Checkbox component before the ListItemText component with a style of `paddingLeft:0` and set color to `primary`
3. In this step, we will be adding the delete feature which will remove an item from the Todo list once it is complete (user clicks on checkbox button)
      + Navigate to `src/pages/Home.js`
        1. Implement the code snippet below for the deleteTodo() function before or after the addTodo() function\
        **Note:** Click [**here**](https://upmostly.com/tutorials/react-filter-filtering-arrays-in-react-with-examples) to learn more about the **filter** function and how it is being used w/in the deleteTodo function to remove an item from our Todo list
        ```
        deleteTodo = (id) => {
            const todos = this.state.todos.filter((todo) => {
              return todo.id !== id;
            });
            this.setState({
              todos: todos,
            });
        };
        ```
        3. Within the Todos component in the render() function, pass in an additional property\
           `deleteTodo={make your change}` to correspond to the deleteTodo function. **Hint:** replace make your change with deleteTodo() function
      + Navigate to `src/component/todos.js`
        1. Add `deleteTodo` as a new property to the Todos component to correspond to the new deleteTodo() function
        2. Within the Checkbox component, add an onClick event handler to call the deleteTodo() function and pass the item's `id` as a parameter
4. In this final step, We will be adding a validation feature to avoid having duplicate tasks w/in the Todo list.
      + Navigate to `src/pages/Home.js`
        1. In the addTodo() function, implement a code to determine if a task already exists before performing the action to add an item to the Todo list. There are plenty of ways to implement this feature.\
        A psudeo code example can be seen below:
        ```
        if (item exists in todo list) {
            do nothing and just return
            to break out the function
        } else {
            perform the action to add
            the item to the Todo list }
        ```
      + **Note:** Look into utilizing the [**find**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) function to check if current item already exists w/in the Todo list. 

## Testing
When testing web components, developers often use ids to uniquely define elements on a page. The React Testing Library provides a query which can identify items with the attribute data-testid to do just that (reference [here](https://testing-library.com/docs/queries/bytestid/)). We have implemented simple tests in `App.test.js` that will look for ids in your code. Do not push changes to the tests in this file. To get familiar with the idea of testing ids, implement the attributes below:
+ `data-testid="new-item-input"` on the Input component which takes user input for new items.
+ `data-testid="new-item-button"` on the Button component which submits new items to the to do list.


Note: Material UI components (and other libraries) render as HTML components under the hood, so using Material UI's TextField would still render in the DOM as an Input element and pass the tests for this lab.

## Pre-session Material
Here is a [**link**](https://) to the pre-session material that was provided to you earlier.
Here is a [**link**](https://) to the Get "Started with Github" that was provided to you earlier. 
