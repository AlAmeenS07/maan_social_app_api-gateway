"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpErrorsTotal = exports.httpRequestDuration = exports.httpRequestsTotal = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const prom_client_2 = __importDefault(require("../config/prom.client"));
exports.httpRequestsTotal = new prom_client_1.default.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: [
        "method",
        "route",
        "status"
    ],
    registers: [prom_client_2.default]
});
exports.httpRequestDuration = new prom_client_1.default.Histogram({
    name: "http_request_duration_seconds",
    help: "Request duration",
    labelNames: [
        "method",
        "route"
    ],
    buckets: [
        0.05,
        0.1,
        0.2,
        0.5,
        1,
        2,
        5
    ],
    registers: [prom_client_2.default]
});
exports.httpErrorsTotal = new prom_client_1.default.Counter({
    name: "http_errors_total",
    help: "Total number of errors",
    labelNames: [
        "route",
        "status"
    ],
    registers: [prom_client_2.default]
});
