import { action, makeObservable, observable } from 'mobx';
import { createContext } from 'react';
import { RootStore } from './RootStore';

export class AuthStore {
  count = 0;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    
    this.rootStore = rootStore;

    makeObservable(this, {
      count: observable,
      increment: action,
    })
  }

  increment() {
    this.count++;
  }
}
