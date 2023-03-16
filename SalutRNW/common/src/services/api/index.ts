import { IService } from '../../types';
import {AuthApi} from './auth';
import {ContentApi} from './content';

export class ApiService implements IService {
  private inited = false;

  
  auth: AuthApi;
  content: ContentApi;

  constructor() {
  
    this.auth = new AuthApi();
    this.content = new ContentApi();
  }

  init = async () => {
    if (!this.inited) {
      // init here
      this.inited = true;
    }
  };
}
