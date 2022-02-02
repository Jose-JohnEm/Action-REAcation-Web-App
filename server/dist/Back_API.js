"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const about_json_1 = __importDefault(require("./src/about_json"));
// Connect MongoDB
const dbURI = 'mongodb+srv://area_ish-ish_2022:YeO7XT8eOtbQFK9H@cluster0.4jz3r.mongodb.net/area2022?retryWrites=true&w=majority';
//mongoose.connect(dbURI);
const app = (0, express_1.default)();
const port = parseInt(process.argv[1]) < 10000 ? parseInt(process.argv[1]) : 8080;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/about.json', about_json_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
//# sourceMappingURL=Back_API.js.map