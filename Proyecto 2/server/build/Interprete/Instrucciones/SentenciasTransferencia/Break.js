"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nodo_1 = __importDefault(require("../../Ast/Nodo"));
class Break {
    constructor() {
    }
    ejecutar(controlador, ts) {
        return this;
    }
    recorrer() {
        let padre = new Nodo_1.default("Break", "");
        return padre;
    }
}
exports.default = Break;
