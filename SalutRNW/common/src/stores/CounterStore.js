"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounterStore = void 0;
var async_storage_1 = require("@react-native-async-storage/async-storage");
var mobx_1 = require("mobx");
var mobx_persist_store_1 = require("mobx-persist-store");
var CounterStore = /** @class */ (function () {
    function CounterStore(rootStore) {
        this.count = 0;
        this.rootStore = rootStore;
        (0, mobx_1.makeObservable)(this, {
            count: mobx_1.observable,
            increment: mobx_1.action,
        });
        (0, mobx_persist_store_1.makePersistable)(this, { name: 'CounterStore', properties: ['count'], storage: async_storage_1.default });
    }
    CounterStore.prototype.increment = function () {
        this.count++;
        console.log('CounterStore.increment');
    };
    return CounterStore;
}());
exports.CounterStore = CounterStore;
