/*
 * (C) 2016 Alexander Mykhailenko
 * MIT LICENCE
 */
'use strict';
var fs = require('fs');
var path = require('path');
var cp = require('child_process');

function init(app_root_folder) {
    console.log('require-root-symlink start working');

    var isWin = /^win/.test(process.platform);
    var node_modules_folder = process.env.NODE_PATH ? process.env.NODE_PATH : path.resolve(app_root_folder, './node_modules');

    // Check and create symlink for firt start
    if (fs.existsSync(path.resolve(node_modules_folder, '_'))) {
        console.log('Symlink "_" currently exist, continue working...');
    } else {
        if (!fs.existsSync(node_modules_folder)) {
            console.log('Folder "' + node_modules_folder + '" NOT exist, trying make it...');
            fs.mkdirSync(node_modules_folder);
        }
        console.log('Symlink "_" NOT exist, trying make it...');

        var spawnArgs = {env: process.env, cwd: node_modules_folder, stdio: 'inherit'};
        if (isWin) {
            cp.spawnSync('cmd', ['/c', 'mklink', '/D', '_', app_root_folder], spawnArgs);
        } else {
            cp.spawnSync('ln', ['-s', app_root_folder, '_'], spawnArgs);
        }

        if (fs.existsSync(path.resolve(node_modules_folder, '_'))) {
            console.log('Symlink "_" successfully created, continue working...');
        } else {
            console.error('Symlink "_" NOT created, try resolve it manually');
            process.exit();
        }
    }
    console.log('require-root-symlink end working');

}

module.exports = init;