# wintastic
 NPM package that gives various information about the underlying windows OS.

# About
 Wintastic is a windows only npm package made in typescript that gives information about various aspects of your windows OS , including User accounts , Startup Programs , and Other OS-related info in a structured manner.


# Installation
- Run The Following Command to install the package
 ```sh
 npm install wintastic
 ```

# Usage Examples
- Get All user accounts
```js
const wintastic = require('wintastic');

const res = wintastic.getUserAccounts()
.then((res) => console.log(res))
.catch((err)=>console.error(err));
```

- Get Windows OS Information
```js
const res = wintastic.WindowsInfo()
.then((res) => console.log(res))
.catch((err)=>console.error(err));
```

- Get all Startup programs
```js
const res = wintastic.getStartupCommand()
.then((res) => console.log(res))
.catch((err)=>console.error(err));
```

