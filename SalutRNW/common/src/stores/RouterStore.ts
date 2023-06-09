import { action, makeObservable, observable } from 'mobx';
import { RootStore } from './RootStore';

type Routes = 'Login'| 'UserInfo';

export class RouterStore {
  screen: Routes = 'Login';
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
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

