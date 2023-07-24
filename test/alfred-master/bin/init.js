#!/usr/bin/env node
'use strict';

const fs = require("fs");
const path = require("path");
const os = require("os");

let projectPath = path.resolve(process.cwd(), '../../../');
let infoPath = path.resolve(projectPath, 'info.plist');
if (!fs.existsSync(infoPath)) {
    let info = fs.readFileSync(path.resolve(process.cwd(), '', 'template/info.plist'), 'UTF-8').toString();
    let packageJsonPath = path.resolve(projectPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
        return;
    }
    const data = fs.readFileSync(packageJsonPath, 'UTF-8').toString();
    if (data) {
        let config = JSON.parse(data);
        const packageName = config.name || '';
        const {name} = parsePackageName(packageName);
        const {name: authorName} = parsePackageAuthor(config.author)

        info = info.replace(/{name}/g, name)
            .replace(/{keyword}/g, name)
            .replace(/{bundleid}/g, packageName)
            .replace('{createdby}', authorName)
            .replace('{description}', config.description || '');
        fs.writeFileSync(infoPath, info);
    }
}

const prefsJsonPath = path.join(os.homedir(), '/Library/Application Support/Alfred/prefs.json');
if (!fs.existsSync(prefsJsonPath)) {
    return;
}
const prefsPath = JSON.parse(fs.readFileSync(prefsJsonPath)).current;
const workflowDir = path.join(prefsPath, 'workflows');

const data = fs.readFileSync(path.resolve(projectPath, 'package.json'), 'UTF-8').toString();
if (data) {
    let config = JSON.parse(data)
    let workflowProjectName = config.name.split('/').join('-');
    const workflowProjectPath = path.join(workflowDir, workflowProjectName);
    if (!fs.existsSync(workflowProjectPath)) {
        fs.symlinkSync(projectPath, path.join(workflowDir, workflowProjectName), 'dir')
    }
}


function parsePackageName(packageName = '') {
    let [scope, name] = (packageName).split('/');
    if (!name) {
        name = scope;
        scope = null;
    }
    return {
        scope, name
    }
}

function parsePackageAuthor(packageAuthor = '') {
    let name = packageAuthor.name;
    let email = packageAuthor.email;
    if (!name) {
        const reg = /(.*) <(.*)>/;
        const group = reg.exec(packageAuthor);
        if (group) {
            name = group[1]
            email = group[2]
        }
    }
    return {
        name,
        email
    }

}

