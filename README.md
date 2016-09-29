# require-root-symlink
Making components first-class for node.js with symlinks

INSTALL
-------
`npm install require-root-symlink` 

USAGE
-----
 - In `index.js` on top add next code: `require('require-root-symlink')(__dirname);`
 - When you will run your nodejs application `require-root-symlink` module will check and create symlink: `node_modules/_` to `.`
 - Now you can use `_` in `require` string:
    
    
    var Config = require('_/Config.js');
    var App = require('_/engine/App.js');
    ..............................


CHANGELOG
---------
### September 29, 2016
- first release  