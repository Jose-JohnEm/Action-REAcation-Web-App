"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const os_1 = require("os");
const app = (0, express_1.default)();
const port = 8080;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/about.json', (req, res) => {
    const nets = (0, os_1.networkInterfaces)();
    const results = {};
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            if (net.family === 'IPv4' && !net.internal) {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    res.send({ client: results['eth0'][0] });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=Back_API.js.map