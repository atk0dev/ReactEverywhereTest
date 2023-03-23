"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterStore = void 0;
var mobx_1 = require("mobx");
var RouterStore = /** @class */ (function () {
    function RouterStore(rootStore) {
        this.screen = 'Login';
        this.rootStore = rootStore;
        (0, mobx_1.makeObservable)(this, {
            screen: mobx_1.observable,
            changeScreen: mobx_1.action,
        });
    }
    RouterStore.prototype.changeScreen = function (newScreen) {
        this.screen = newScreen;
    };
    return RouterStore;
}());
exports.RouterStore = RouterStore;
