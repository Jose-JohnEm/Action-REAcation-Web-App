"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const about_json_1 = __importDefault(require("./src/about_json"));
const mongoose_1 = __importDefault(require("mongoose"));
const authenticator_1 = __importDefault(require("./src/auth/authenticator"));
const app = (0, express_1.default)();
const port = (parseInt(process.argv[2]) < 65536) ? parseInt(process.argv[2]) : 8080;
///// Connect MongoDB and Server /////
const successServerStarted = () => {
    console.log(`MongoDB Connected succesfully !\nExample app listening at http://localhost:${port}`);
};
const dbURI = 'mongodb+srv://area_ish-ish_2022:YeO7XT8eOtbQFK9H@cluster0.4jz3r.mongodb.net/area2022?retryWrites=true&w=majority';
mongoose_1.default.connect(dbURI)
    .then((result) => app.listen(port, successServerStarted))
    .catch((error) => console.log(error));
///// Add custom debug middleware /////
app.use((req, res, next) => {
    console.log(req.url);
    next();
});
///// Routes /////
app.get('/', about_json_1.default);
app.get('/about.json', about_json_1.default);
app.use('/auth', authenticator_1.default);
exports.default = app;
//# sourceMappingURL=Back_API.js.map