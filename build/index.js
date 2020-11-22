"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var router_1 = __importDefault(require("./router"));
var app = express_1.default();
// body-parser中间件处理提交表单
app.use(body_parser_1.default.urlencoded({ extended: false }));
// cookie-session 中间件处理登录
app.use(cookie_session_1.default({
    name: 'session',
    keys: ['teacher'],
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use(router_1.default);
app.listen(7001, function () {
    console.log('express5');
});
