import React from 'react';

import { ApiService } from './api';
import { IService } from '../types/index';

class Services {
	api = new ApiService();
}
export const services = new Services();

const ServicesContext = React.createContext<Services>(services);

export const useServices = (): Services => React.useContext(ServicesContext);

export const initServices = async () => {
	for (const key in services) {
		if (Object.prototype.hasOwnProperty.call(services, key)) {
			const s = (services as any)[key] as IService;

			if (s.init) {
				await s.init();
			}
		}
	}
};
