import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { LocalUser } from '../types/local';
import { DesignerRootStore } from './DesignerRootStore';

export class DesignerAuthStore {
	authorized: boolean = false;
	userId: string = '';
	accessToken: string = '';
	userEmail: string = '';

	rootStore: DesignerRootStore;

	constructor(rootStore: DesignerRootStore) {
		this.rootStore = rootStore;

		makeObservable(this, {
			authorized: observable,
			userId: observable,
			accessToken: observable,
			userEmail: observable,

			authorize: action,
      logout: action,
		});

		makePersistable(this, {
			name: 'DesignerAuthStore',
			properties: [
				'userId',
				'authorized',
				'accessToken',
				'userEmail',
			],
			storage: AsyncStorage,
		});
	}

	authorize(user: LocalUser) {
		this.authorized = true;
		this.accessToken = user.accessToken;
		this.userId = user.userId;
		this.userEmail = user.email;
	}

  logout() {
    this.authorized = false;
		this.accessToken = '';
		this.userId = '';
		this.userEmail = '';
  }
}
