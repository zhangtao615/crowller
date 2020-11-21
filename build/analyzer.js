"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cheerio_1 = __importDefault(require("cheerio"));
var fs_1 = __importDefault(require("fs"));
;
;
var Analyzer = /** @class */ (function () {
    function Analyzer() {
        this.courseInfo = [];
    }
    // 获取课程信息
    Analyzer.prototype.getCourseInfo = function (html) {
        var _this = this;
        var $ = cheerio_1.default.load(html);
        var courseItems = $('.course-item');
        courseItems.map(function (index, item) {
            var descs = $(item).find('.course-desc');
            var title = descs.eq(0).text();
            var count = parseInt(descs.eq(1).text().split('：')[1], 10);
            _this.courseInfo.push({
                title: title, count: count
            });
        });
        return {
            time: (new Date()).getTime(),
            data: this.courseInfo
        };
    };
    ;
    // 处理获取到的信息
    Analyzer.prototype.generatrJsonContent = function (courseInfo, filePath) {
        var fileContent = {};
        if (fs_1.default.existsSync(filePath)) {
            fileContent = JSON.parse(fs_1.default.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    };
    Analyzer.prototype.analyzer = function (html, filePath) {
        var courseInfo = this.getCourseInfo(html);
        var fileContent = this.generatrJsonContent(courseInfo, filePath);
        return JSON.stringify(fileContent);
    };
    return Analyzer;
}());
exports.default = Analyzer;
