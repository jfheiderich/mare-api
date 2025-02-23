"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/", routes_1.default);
app.get("/", (req, res) => {
    res.json({ message: "API funcionando corretamente! 🚀" });
});
app.get("/favicon.ico", (req, res) => {
    res.status(200).send();
});
const port = process.env.PORT || 4444;
app.listen(port, () => {
    console.log(`server on port ${port}`);
});
exports.default = app;
