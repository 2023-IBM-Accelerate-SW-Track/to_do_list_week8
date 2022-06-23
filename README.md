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
      + Navigate to our project's root directory and run the following command w/in the terminal. **Hint:** Essentially, this is the directory where our `src` and `public` folders are located.
        1. Create a new folder called `backend` that will essentially host our Express application by running the following command: `mkdir backend`
      + Navigate to the newly created `backend` folder and run the following commands w/in the terminal. **Hint:** Currently, this directory should be empty with no such sub-folders or files present.
        1. Run the following command to initialize your directory with some basic information: `npm init`\
           **Note:** Accept all default configuration values.
        2. Run the following command to install Express as a dependency: `npm install express`
        3. Run the following command to install cors as a dependency: `npm install cors`\
           **Note:** Cors allows us to relax the security applied to an API and you can learn more about this module [**here**](https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/)
        5. Create a new file called `index.js` out of which we'll run our Express server by running this command: `touch index.js`\
           **Note:** If this command doesn't work, look into creating the file thru a file explorer.
         
      + The file structure of your project should now look similar to what is shown on the screenshot below:
        <img width="299" alt="Screen Shot 2022-06-23 at 6 25 55 AM" src="https://user-images.githubusercontent.com/57464095/175310108-65d0525c-c0b4-4432-8c12-a01ce7a0c05e.png">
           
2. In this step, we will be using Express to create a simple web server that will then be ran on a specified port.\
   **Note:** As you follow along w/ these sub-steps, place each snippet of code below the other.
      + Navigate to `backend/index.js`
        1. Implement the code snippet provided below:
           ```
           const express = require("express"),
                  app = express(),
                  port = process.env.PORT || 8080,
                  cors = require("cors");
           const bodyParser = require('body-parser');
           const fs = require("fs");
           ```
        2. Implement the code snippet provided below:
           ```
           app.use(cors());
           app.use(bodyParser.json({ extended: true }));
           app.listen(port, () => console.log("Backend server live on " + port));
           ```
        3. Implement the code snippet provided below:
           ```
           app.get("/", (req, res) => {
           res.send({ message: "Connected to Backend server!" });
           });
           ```
         4. Implement the code snippet provided below:
            ```
            app.post("/add/item", addItem)
            ```
         5. Implement the code snippet provided below:
            ```
            function addItem (request, response) {
            let task = request.body.jsonObject.task
            let curDate = request.body.jsonObject.currentDate
            let dueDate = request.body.jsonObject.dueDate
            var newTask = {
              Task: task,
              Current_date: curDate,
              Due_date: dueDate
            }
            const jsonString = JSON.stringify(newTask)

            var data = fs.readFileSync('database.json');
            var json = JSON.parse(data);
            json.push(newTask);
            fs.writeFile("database.json", JSON.stringify(json), function(err, result) {
              if (err) { console.log('error', err) }
              else { console.log('Successfully wrote to file') }
            });
            response.send(200)
            }
            ```
           
3. In this step, we will be creating a json file to act as our database and hold data submitted from our Front-end application once a user clicks on the **Add** button.
      + Navigate to the `backend` directory. **Hint:** This is the directory that only contains package.json, package-lock.json, and index.js files.
        1. Create a new file called `database.json` out of which we'll store the data received from the front-end by running this command: `touch database.json`\
           **Note:** If this command doesn't work, look into creating the file thru a file explorer.
      + Navigate to `backend/database.json`
        1. Implement the code snippet provided below:
           ```
           []
           ```
      + The file structure of your project should now look similar to what is shown on the screenshot below:
        <img width="302" alt="Screen Shot 2022-06-23 at 11 27 59 AM" src="https://user-images.githubusercontent.com/57464095/175369370-5a323053-deff-43a3-ad1c-bca2918135f8.png">

### Todo List APP (Front-End)
1. In this step, we will be implementing axios in order to submit requests to the Express Application as well as to receive a response.
      + Navigate to our project's root directory and run the following command w/in the terminal. **Hint:** Essentially, this is the directory where our `src` and `public` folders are located.
        1. Run the following command to install Axios as a dependency: `npm install axios`
      + Navigate to `src/component/AddTodo.js`
        1. Import the Axios library at the top of our file:
           ```
           import Axios from "axios";
           ```
        2. 

## Running Application
Upon completion of Week 4 Lab Project, all the necessary components and functions should be implemented in order to successfully complete the test cases mentioned below:
+ Add Button Componenet adds task to list (on click)
+ Add Button Componenet doesn't add blank task to list (on click)
+ Add Button Componenet doesn't add duplicate task to list (on click)
+ Checkbox Button component removes task from list (on click)

## Pre-session Material
Here is a [**link**](https://ibm.ent.box.com/file/969593458868?s=cj7tfykcxop5kfaz5b18dszfcfz0ac1e) to the pre-session material that was provided to you earlier.
