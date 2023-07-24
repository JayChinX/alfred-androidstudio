#!/usr/bin/env node
'use strict';

const fs = require("fs");
const path = require("path");
const os = require("os");

const prefsJsonPath = path.join(os.homedir(), '/Library/Application Support/Alfred/prefs.json');
const prefsPath = JSON.parse(fs.readFileSync(prefsJsonPath)).current;
const workflowDir = path.join(prefsPath, 'workflows');

let projectPath = path.resolve(process.cwd(), '../../../');

const data = fs.readFileSync(path.resolve(projectPath, 'package.json'), 'UTF-8').toString();
if (data) {
    let config = JSON.parse(data)
    let workflowProjectName = config.name.split('/').join('-');
    let workflowProjectPath = path.join(workflowDir, workflowProjectName)

    if (fs.existsSync(workflowProjectPath)) {
        fs.unlinkSync(path.join(workflowDir, workflowProjectName))
    }
}

