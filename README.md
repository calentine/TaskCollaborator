# React + Vite

**Solution Steps**
-First I started with the frontend, to let Ui help me visualize flow of the application
-Started building individual components (separation of concerns) to piece together
-Added String literals to test overall look of the components on the page
-Started adding variables, functions to capture User entered values
    -TaskInput (enables user to add tasks)
    -TaskList add list to store all user tasks, provides the interaction between TaskInput 
        -provided adding, deleting, and complete task functionility
        -the individual tasks were initially just a <li> nested within DisplayTaskList
-Then I created another component <Task> that replaced the <li> within DisplayTaskList 
    -provides a way to Display Task: info, and functions: deleting, task complete status
-Testing app
-Added more styling buttons, trash can, etc...
-Last I implemented the websockets
 -started with emitting connection/disconnection, and current taskList events
 -added adding, deleting, completeing events afterwards
    -also provided console logs to ensure data, matched with users connecting and Ui interactions
- Added matching logic within the TaskList (frontend)
-Final Testing with websockets, multiple users, checking console server logs, etc...


**to install**:
Install dependencies 
    -npm install

**start app**
server:
    -node server.js
frontend:
    -npm run dev
    -Ctrl + click (http://localhost)

**Add multiple users**
    -Open multiple windows by Ctrl + clicking (http://localhost)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
