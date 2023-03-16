import { createContext } from "react";
import { AuthStore } from "./AuthStore";
import { CounterStore } from "./CounterStore";
import { RouterStore } from "./RouterStore";

export class RootStore {
  routerStore = new RouterStore(this);
  authStore = new AuthStore(this);
  counterStore = new CounterStore(this);
}

export const RootStoreContext = createContext(new RootStore());