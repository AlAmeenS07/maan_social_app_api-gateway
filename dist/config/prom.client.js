"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prom_client_1 = __importDefault(require("prom-client"));
const register = new prom_client_1.default.Registry();
prom_client_1.default.collectDefaultMetrics({
    register,
});
exports.default = register;
