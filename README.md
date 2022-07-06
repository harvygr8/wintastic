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

- Get a list of all the startup programs along with the path and the user
```js
const wintastic = require('wintastic');

const res = wintastic.getStartupCommand()
.then((res) => console.log(res))
.catch((err)=>console.error(err));
/* Sample Output
  {
    caption: 'OneDrive',
    command: '"C:\\Users\\Admin\\AppData\\Local\\Microsoft\\OneDrive\\OneDrive.exe" /background',
    user: 'Admin'
  },
  {
    caption: 'Steam',
    command: '"C:\\Program Files (x86)\\Steam\\steam.exe" -silent',
    user: 'Admin'
  },
  {
    caption: 'MySQL Notifier',
    command: 'C:\\Program Files (x86)\\MySQL\\MySQL Notifier 1.1\\MySqlNotifier.exe',
    user: 'Admin'
  },
  {
    ...
  },
  ...
*/
```
- Get information related to all user accounts like SID , Account type , etc.
```js
const res = wintastic.getUserAccount()
.then((res) => console.log(res))
.catch((err)=>console.error(err));
```

- Get OS related information like version , build number , last boot time , install date , etc.
```js
const res = wintastic.getWindowsInfo()
.then((res) => console.log(res))
.catch((err)=>console.error(err));
```


