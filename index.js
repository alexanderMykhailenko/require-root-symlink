/*
 * (C) 2016 Alexander Mykhailenko
 * MIT LICENCE
 */

'use strict';
const debug = require('debug')('require-root-symlink');
var fs = require('fs');
var path = require('path');
var cp = require('child_process');

function init(app_root_folder) {
    debug('start working');
    if (!app_root_folder) {
        debug('please provide app_root_folder');
        throw new Error('please provide app_root_folder');
    }

    var isWin = /^win/.test(process.platform);
    var node_modules_folder = process.env.NODE_PATH ? process.env.NODE_PATH : path.resolve(app_root_folder, './node_modules');

    // Check and create symlink for firt start
    if (fs.existsSync(path.resolve(node_modules_folder, '_'))) {
        debug('Symlink "_" currently exist, continue working...');
    } else {
        if (!fs.existsSync(node_modules_folder)) {
            debug('Folder "%s" NOT exist, trying make it...', node_modules_folder);
            fs.mkdirSync(node_modules_folder);
        }
        debug('Symlink "_" NOT exist, trying make it...');

        var spawnArgs = {env: process.env, cwd: node_modules_folder, stdio: 'inherit'};
        if (isWin) {
            cp.spawnSync('cmd', ['/c', 'mklink', '/D', '_', app_root_folder], spawnArgs);
        } else {
            cp.spawnSync('ln', ['-s', app_root_folder, '_'], spawnArgs);
        }

        if (fs.existsSync(path.resolve(node_modules_folder, '_'))) {
            debug('Symlink "_" successfully created, continue working...');
        } else {
            debug('Symlink "_" NOT created, try resolve it manually');
            throw new Error('Symlink "_" NOT created, try resolve it manually');
        }
    }
    debug('end working');
}

module.exports = init;

console.log(init(__dirname));