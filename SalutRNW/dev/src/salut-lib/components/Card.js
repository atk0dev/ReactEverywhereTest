"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var react_1 = __importDefault(require("react"));
var react_native_1 = require("react-native");
var Card = function (_a) {
    var text = _a.text, onButtonClick = _a.onButtonClick;
    return (react_1.default.createElement(react_native_1.View, { style: styles.card },
        react_1.default.createElement(react_native_1.Text, null, text),
        react_1.default.createElement(react_native_1.Button, { title: "Click", onPress: function () { return onButtonClick('result 123'); } })));
};
exports.Card = Card;
var styles = react_native_1.StyleSheet.create({
    card: {
        backgroundColor: 'yellow'
    }
});
