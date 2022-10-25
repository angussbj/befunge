# Befunge code editor and interpreter

A simple code editor, interpreter, and debugger for [Befunge](https://en.wikipedia.org/wiki/Befunge), deployed
at https://angussbj.github.io/befunge/.

## Project structure

At a high level, here are the important classes, components and areas in the codebase:

- `logic` - a directory containing both the logic of the Befunge execution and of the text editor
    - `BefungeCore` - the class responsible for executing befunge code according to the befunge language specification
        - `step` - the method for executing a single instruction and moving the execution cursor to the next instruction
    - `BefungeRunner` - the class responsible for running, pausing, and deciding when it's worth rendering the current
      state
    - `CodeEditor` - the class responsible for the user's interactions with the code: input, delete, select, copy,
      paste, and more
    - `Code` - the class responsible for storing the code (both the current state including edits made by the program
      during execution, and the original state it will revert to when the program is reset after execution). An instance
      of this class is shared by the `CodeEditor`, `BefungeCore` and `BefungeRunner`, all of which can manipulate it.
- `App.tsx` - the root of the react app
- `components` - the directory with the "clever" components and react hooks that hold and interact with instances of the
  logic classes, like `Grid`, `ControlPanel`, `InputOutput`, or `useBefunge`
- `ui` - the directory with the "dumb" components like `Sidebar`, `Button`, or `TextField`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn deploy`

Deploys the app on Github Pages

