"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var util = require("util");
function loadEnvironment(ROOT_PATH) {
    var ENV_TYPE = process.env.NODE_ENV || '';
    var ENV_FILE = path.join(ROOT_PATH, (ENV_TYPE ? '.env.' + ENV_TYPE : '.env'));
    if (fs.existsSync(ENV_FILE) === false) {
        ENV_FILE = path.join(ROOT_PATH, '..', (ENV_TYPE ? '.env.' + ENV_TYPE : '.env'));
    }
    if (fs.existsSync(ENV_FILE)) {
        var envVars = fs.readFileSync(ENV_FILE, 'utf-8').split('\n').filter(Boolean);
        envVars.forEach(function (variable) {
            if (variable.trim()[0] === '#') {
                return;
            }
            var envVariable = variable.split('=').filter(Boolean);
            if (envVariable.length !== 2) {
                throw new Error(util.format('Environment variable %s is not valid', variable));
            }
            if (process.env[envVariable[0]] === undefined) {
                process.env[envVariable[0]] = envVariable[1];
            }
        });
    }
}
exports.loadEnvironment = loadEnvironment;
//# sourceMappingURL=env.js.map