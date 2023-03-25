import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { PropertyChangedResult, ToolboxItem } from '../types';
import { DesignerRootStore } from './DesignerRootStore';

export class DesignerMainStore {
  count = 0;
  canvasState: Array<ToolboxItem> = [];
  rootStore: DesignerRootStore;
  
  constructor(rootStore: DesignerRootStore) {

    this.rootStore = rootStore;

    makeObservable(this, {
      count: observable,
      canvasState: observable,
      setCanvasStore: action,
      setControlValue: action,
    })

    makePersistable(this, { name: 'DesignerMainStore', properties: ['count', 'canvasState'], storage: AsyncStorage });
  }

  setCanvasStore(canvasState: Array<ToolboxItem>) {
    this.canvasState = canvasState;
  }

  setControlValue(value: PropertyChangedResult) {
    if (!value) return;

    let item = this.canvasState.find(i => i.id === value.controlId);
    if (!item) return;
    
    if (item.publicProps) {
      let prop = item.publicProps.find(p => p.name === value.propertyName);
      if (!prop) return;

      prop.value = value.propertyValue;
    }
  }
}
