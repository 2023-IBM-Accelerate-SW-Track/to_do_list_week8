# Project Week 3 To-do list application (Cont.)
## Introduction
As of now, you have completed Project Week 2 and should now have a React Application Todo List Application that can add and delete unique tasks. For Project Week 3 we will finish up the frontend and make our own unit tests to make sure out App is working properly  We encourage you to take a unique approach to this lab as there is no one right answer. 
- [Material Design](https://material.io/design/introduction) is a design system that can guide you on what UI decisions to make if you would like to explore best practices, but functionality is the key focus of the lab.
- No back-end is required for this lab, all data (tasks) should live in the front-end.


## Requirements
Feature requirements (Week 3 task is complete when you):
+ Provide the due date for the task
+ Change the color of overdue tasks
+ Make test cases to test your application

Implementation requirements:
+ Use [**DesktopDatePicker**](https://mui.com/x/react-date-pickers/date-picker/)  to store the date that the task should be finished by.
+ Use [**React Testing Library**](https://testing-library.com/docs/react-testing-library/cheatsheet) to create unit tests to test your code.

Instructions:
+ To add the Date Picker add these imports to `AddTodo.js` 
```
import { DesktopDatePicker , LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
``` 
+ Then you need to add this between the text field that you used to get the task name and the button to submit the task information.
 ```   
<LocalizationProvider dateAdapter={AdapterDateFns}>         
   <DesktopDatePicker
        id="new-item-date"
        label="Due Date"
        value={/*value*/}
        onChange={/*onChange*/}
        renderInput={(params) => <TextField {...params} />}
    />
</LocalizationProvider>
```
+ Next inside  `state = { //code here// }` add a new variable to store the due date and set it to null (i.e. `due : null,`)
+ Replace `\*value*\` with the new state variable.
+ Finally change `\*OnChange*\` to a new onChange function and use the new state variable. 
+ Note that the value from the the date picker will give more that just the date in mm/dd/yyyy. To format the date we need set the due date variable to `new Date(e).toLocaleDateString()`
+ Note when reseting the due date variable set it to null in the `onSubmit` function

Right now the button works however we are able submit a task with an empty due date. We need to change this so that only task with both a task name and due date create a task. 

+ We need to go to `Home.js` and go to the `addTodo` function. The date picker will give us three values: A valid date in string form, `"Invalid Date"` or `null`. Make sure that if the due date is `"Invalid Date"` or `null` no task is made.

At this point we have a working button that properly creates tasks with due dates however the due date value isn't being currently used.

+ We want to display these due dates and highlight any overdue items. We can do this in `todos.js`
+ Inside the map function make a variable called `color` and set it to `#ffffffff` or `white` (#ffffffff is white's hex color value)
+ Then compare todays date to the due date of the task. If the due date is in the past change `color` to a new color. (Play around and find a color that you like.) 
+ Next inside the card that you used to display the tasks set the background to `color`.
+ Add `data-testid={/*task-name*/}` inside the card as well. Where `task-name` is the variable that holds the task name
+ Finally change the value of `secondary={/*Somevalue*/}` with your due date value.

## Testing
+ Here is an example of a unit test that adds a History Test task
```
test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy")
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}})
  fireEvent.click(element)
  const check = screen.getByText(/History Test/i)
  expect(check).toBeInTheDocument();
 });

```
+ `render(<App />);` mocks the compentent so that we can do the testing
+ `screen.getByRole('textbox', {name: /Add New Item/i})`  Looks for a textbox compentent with the words "Add New Item"
+ `fireEvent.change(inputTask, { target: { value: "History Test"}})` Types the value "History Test" into the text box.
+ `fireEvent.click()` clicks the selected element.
+ `screen.getByText(/History Test/i)` searches for "History Test" on the screen. 
+ `expect(check).toBeInTheDocument();` the element should be in the page if it is the test case is passed. Otherwise the test fails.

Note: that the elements returned by getByRole or getByText may not have css or styling. If you want to have those values put a data-testid in that component and use getByTestId to grab those IDs.

Complete the Following Test Cases in `AddTodo.test.js`
  + No duplicate task
  + Submit Task with No Due Date
  + Submit Task with No Task Name
  + Late Tasks have Different Colors
  + Delete Task
 ## Pre-session Material
Here is a [**link**](https://) to the pre-session material that was provided to you earlier.
