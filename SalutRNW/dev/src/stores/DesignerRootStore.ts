import { createContext } from "react";
import { DesignerAuthStore } from "./DesignerAuthStore";
import { DesignerMainStore } from "./DesignerMainStore";
import { DesignerRouterStore } from "./DesignerRouterStore";

export class DesignerRootStore {
  routerStore = new DesignerRouterStore(this);
  authStore = new DesignerAuthStore(this);
  mainStore = new DesignerMainStore(this);
}

export const DesignerRootStoreContext = createContext(new DesignerRootStore());