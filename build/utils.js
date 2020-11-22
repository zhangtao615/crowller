"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResData = void 0;
exports.getResData = function (data, errMessage) {
    if (errMessage) {
        return {
            success: false,
            errMessage: errMessage,
            data: data
        };
    }
    return {
        success: true,
        data: data
    };
};
