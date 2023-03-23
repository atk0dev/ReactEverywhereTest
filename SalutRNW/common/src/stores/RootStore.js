"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootStoreContext = exports.RootStore = void 0;
var react_1 = require("react");
var AuthStore_1 = require("./AuthStore");
var CounterStore_1 = require("./CounterStore");
var RouterStore_1 = require("./RouterStore");
var RootStore = /** @class */ (function () {
    function RootStore() {
        this.routerStore = new RouterStore_1.RouterStore(this);
        this.authStore = new AuthStore_1.AuthStore(this);
        this.counterStore = new CounterStore_1.CounterStore(this);
    }
    return RootStore;
}());
exports.RootStore = RootStore;
exports.RootStoreContext = (0, react_1.createContext)(new RootStore());
