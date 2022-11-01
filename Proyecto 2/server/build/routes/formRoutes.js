"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class FormRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get("/", (req, res) => res.send("Form"));
    }
}
const formRoutes = new FormRoutes();
exports.default = formRoutes.router;
