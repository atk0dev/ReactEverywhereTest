import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { RootStore } from './RootStore';

export class CounterStore {
  count = 0;
  rootStore: RootStore;
  
  constructor(rootStore: RootStore) {

    this.rootStore = rootStore;

    makeObservable(this, {
      count: observable,
      increment: action,
    })

    makePersistable(this, { name: 'CounterStore', properties: ['count'], storage: AsyncStorage });
  }

  increment() {
    this.count++;
    console.log('CounterStore.increment');
  }
}
