"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimChars = void 0;
// Credit for performant answer: https://stackoverflow.com/questions/26156292/trim-specific-character-from-a-string
function trimChars(str, chars) {
    var start = 0, end = str.length;
    while (start < end && chars.indexOf(str[start]) >= 0)
        ++start;
    while (end > start && chars.indexOf(str[end - 1]) >= 0)
        --end;
    return start > 0 || end < str.length ? str.substring(start, end) : str;
}
exports.trimChars = trimChars;
