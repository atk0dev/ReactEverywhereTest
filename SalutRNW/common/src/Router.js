"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
var mobx_react_lite_1 = require("mobx-react-lite");
var react_1 = require("react");
var react_2 = require("react");
var Login_1 = require("./screens/Login");
var UserInfo_1 = require("./screens/UserInfo");
var RootStore_1 = require("./stores/RootStore");
exports.Router = (0, mobx_react_lite_1.observer)(function () {
    var rootStore = (0, react_2.useContext)(RootStore_1.RootStoreContext);
    return rootStore.routerStore.screen == "Login" ? <Login_1.Login /> : <UserInfo_1.UserInfo />;
});
