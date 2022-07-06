# wintastic
 Get a variety of information about your windows machine.

# About
 Wintastic is a windows-only (for now) npm package made in typescript that gives information about various aspects of your windows OS , including user accounts , startup programs , and other OS-related info in a structured manner.


# Installation
- Run The Following Command to install the package
 ```sh
 npm install wintastic
 ```

# Usage Examples
- Get all the user accounts
```js
const wintastic = require('wintastic');

const res = wintastic.getUserAccount()
.then((res) => console.log(res))
.catch((err)=>console.error(err));
```

- Get OS information
```js
const res = wintastic.getWindowsInfo()
.then((res) => console.log(res))
.catch((err)=>console.error(err));
```

- Get a list of all the startup programs
```js
const res = wintastic.getStartupCommand()
.then((res) => console.log(res))
.catch((err)=>console.error(err));
```

