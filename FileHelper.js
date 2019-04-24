'use strict ';
"use strict";
exports.__esModule = true;
exports.isFilePathCSV = function (filePath) {
    var regexp = /\.csv$/;
    return regexp.test(filePath);
};
