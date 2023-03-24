import { action, makeObservable, observable } from 'mobx';
import { DesignerRootStore } from './DesignerRootStore';

type Routes = 'Login'| 'Main';

export class DesignerRouterStore {
  screen: Routes = 'Main';
  rootStore: DesignerRootStore;

  constructor(rootStore: DesignerRootStore) {
    this.rootStore = rootStore;

    makeObservable(this, {
      screen: observable,
      changeScreen: action,
    })
  }

  changeScreen(newScreen: Routes) {
    this.screen = newScreen;
  }
}

