# Project Week 4: To-do list application (Cont.)
## Introduction
As of now, you have completed Project Week 3 and should now have a fully functional React Application with the ability to navigate to an **About me** page and a **Home** page hosting the Todo List Application. The Todo List Application itself allows users to provide a task w/ a due date, create a list w/ those user inputs to be displayed on a webpage, mark those task as complete and remove them from the list, and etc. Currently, all data which is essentially our tasks in this case lives in the front-end (Todo List Application). Everytime we refresh the page or restart our application that data is lost. This is where the backend component comes into play. The backend component will allow us to communicate to our front-end component (Todo List Application) using express and save our data inside a database (json file) where data will not be lost after a page refresh or application restart. For Project Week 4, you will go thru the process of initializing and creating a backend component, using express to communicate with the front-end component, and using axios to communicate with backend component.

## Requirements
Feature requirements (Week 4 task is complete when you):
+ Create and Initialize an Express application (Backend)
+ Create a connection between the Backend and Front-end
+ Create a json file to represent your database
+ Create a **POST** request to submit data to a json file

Implementation requirements:
+ Use [**Express**](https://www.npmjs.com/package/express) w/in the backend component
+ Use [**Axios**](https://www.npmjs.com/package/axios) w/in the front-end component (Todo List Application)

## Instructions

### Express APP (Backend)
1. In this step, we will be going thru the process of creating an Express application w/ in our Todo List Application. **Note:** From here on out, the term Backend will correspond to our Express Application, Front-end will correspond to our Todo List Application, and vice versa.
      + Navigate to our project's `root` directory and run the following command w/in the terminal. **Hint:** Essentially, this is the directory where our `src` and `public` folders are located.
        1. Create a new folder called `backend` that will essentially host our Express application by running the following command: `mkdir backend`
      + Navigate to the newly created `backend` folder and run the following commands w/in the terminal. **Hint:** Currently, this directory should be empty with no such sub-folders or files present.
        1. Run the following command to initialize your directory with some basic information: `npm init`\
           **Note:** Accept all default configuration values.
        2. Run the following command to install Express as a dependency: `npm install express`
        3. Run the following command to install cors as a dependency: `npm install cors`\
           **Note:** Cors allows us to relax the security applied to an API and you can learn more about this module [**here**](https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/)
        5. Create a new file called `index.js` out of which we'll run our Express server by running this command: `touch index.js`\
           **Note:** If this command doesn't work, look into creating the file thru a file explorer.
        5. The file structure of your project should now look similar to what is shown on the screenshot below:
           <img width="299" alt="Screen Shot 2022-06-23 at 6 25 55 AM" src="https://user-images.githubusercontent.com/57464095/175310108-65d0525c-c0b4-4432-8c12-a01ce7a0c05e.png">
           
2. In this step, we will be adding the checkbox feature to correspond to a task being completed
      + Navigate to `src/component/todos.js`
        1. If not present, import Checkbox from the material UI library
        2. Within the ListItemButton component, Add a Checkbox component before the ListItemText component with a `style` property set to `paddingLeft:0` and a `color` property set to `primary`. **Hint:** `color` is a property of its own and not a property of `style`.
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
        2. Within the Todos component in the render() function, pass in an additional property\
           `deleteTodo={make your change}` to correspond to the deleteTodo function. **Hint:** replace `make your change` with deleteTodo() function
      + Navigate to `src/component/todos.js`
        1. Add `deleteTodo` as a new property to the Todos component to correspond to the new deleteTodo() function
        2. Within the Checkbox component, add an onClick event handler to call the deleteTodo() function and pass the todo item's `id` as a parameter. **Hint:** Use an Arrow Function. Click [**here**](https://reactjs.org/docs/faq-functions.html) to learn about passing functions to components.
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
      ```
      array = [1,2,3,4,5,6]
      const exists = array.find(t => t === '4')
      console.log(exists)
      
      Output: true
      ```

## Testing
Upon completion of Week 2 Lab Project, all the necessary components and functions should be implemented in order to successfully complete the test cases mentioned below:
+ Add Button Componenet adds task to list (on click)
+ Add Button Componenet doesn't add blank task to list (on click)
+ Add Button Componenet doesn't add duplicate task to list (on click)
+ Checkbox Button component removes task from list (on click)


Note: Material UI components (and other libraries) render as HTML components under the hood, so using Material UI's TextField would still render in the DOM as an Input element and pass the tests for this lab.

## Pre-session Material
Here is a [**link**](https://ibm.ent.box.com/file/969593458868?s=cj7tfykcxop5kfaz5b18dszfcfz0ac1e) to the pre-session material that was provided to you earlier.


# Project Week 3 To-do list application (Cont.)
## Introduction
As of now, you have completed Project Week 2 and should now have a React Application Todo List Application that can add and delete unique tasks. For Project Week 3 we will finish up the frontend and make our own unit tests to make sure out App is working properly  We encourage you to take a unique approach to this lab as there is no one right answer. 
- [Material Design](https://material.io/design/introduction) is a design system that can guide you on what UI decisions to make if you would like to explore best practices, but functionality is the key focus of the lab.
- No back-end is required for this lab, all data (tasks) should live in the front-end.
