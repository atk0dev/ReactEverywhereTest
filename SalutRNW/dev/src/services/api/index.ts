import { IService } from '../../types/index';
import {AuthApi} from './auth';
import {ContentApi} from './content';
import {ProjectApi} from './project';

export class ApiService implements IService {
  private inited = false;
  
  auth: AuthApi;
  content: ContentApi;
  project: ProjectApi;

  constructor() {
  
    this.auth = new AuthApi();
    this.content = new ContentApi();
    this.project = new ProjectApi();
  }

  init = async () => {
    if (!this.inited) {
      // init here
      this.inited = true;
    }
  };
}
