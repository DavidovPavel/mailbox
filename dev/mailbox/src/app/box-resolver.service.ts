import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class BoxResolverService implements Resolve<any> {
  constructor(private api: ApiService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.paramMap.get('id');

    return this.api.getMails(id);
  }
}
