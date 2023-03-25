import AsyncStorage from '@react-native-async-storage/async-storage';
import { action, makeObservable, observable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { LocalUser } from '../types/local';
import { RootStore } from './RootStore';

export class AuthStore {
	authorized: boolean = false;
	userId: string = '';
	accessToken: string = '';
	userEmail: string = '';

	rootStore: RootStore;

	constructor(rootStore: RootStore) {
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
			name: 'AuthStore',
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
