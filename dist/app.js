"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const cors_1 = __importDefault(require("cors"));
const error_middleware_1 = require("./middlewares/error.middleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const media_routes_1 = __importDefault(require("./routes/media.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const metrics_middleware_1 = require("./middlewares/metrics.middleware");
const req_id_middleware_1 = require("./middlewares/req.id.middleware");
const prom_client_1 = __importDefault(require("./config/prom.client"));
const req_logger_middleware_1 = require("./middlewares/req.logger.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(req_id_middleware_1.requestIdMiddleware);
app.use(req_logger_middleware_1.requestLogger);
app.use(metrics_middleware_1.metricsMiddleware);
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(process.env.USER_SERVICE_ROUTE, user_routes_1.default);
app.use(process.env.MEDIA_SERVICE_ROUTE, media_routes_1.default);
app.use(process.env.POST_SERVICE_ROUTE, post_routes_1.default);
app.get(process.env.BACK_SLASH_ROUTE, (_req, res) => {
    res.send("Api gateway is running...");
});
app.get(process.env.METRICS_ROUTE, async (_req, res) => {
    res.set("Content-Type", prom_client_1.default.contentType);
    res.end(await prom_client_1.default.metrics());
});
app.use(error_middleware_1.errorHandler);
const PORT = Number(process.env.PORT);
app.listen(PORT, () => {
    console.log(`Api gateway is running on http://localhost:${PORT}`);
});
