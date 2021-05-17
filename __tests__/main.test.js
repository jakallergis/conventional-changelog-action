"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const child_process_1 = __importDefault(require("child_process"));
const path_1 = require("path");
// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
    process_1.env['INPUT_MILLISECONDS'] = '500';
    const np = process_1.execPath;
    const ip = path_1.join(__dirname, '..', 'lib', 'main.js');
    const options = {
        env: process_1.env
    };
    console.log(child_process_1.default.execFileSync(np, [ip], options).toString());
});
