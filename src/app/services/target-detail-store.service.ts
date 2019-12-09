import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from "@angular/router";

import {
  ITargetDetail,
  ITargetDetailHeader,
  ISubunitInteraction,
  IPostTranslationalModification } from '../protein-expression.interface';

@Injectable({
  providedIn: 'root'
})
export class TargetDetailStoreService {
  private targetDetailStoreSubject = new BehaviorSubject<ITargetDetail>( null );
  targetDetailStore$ = this.targetDetailStoreSubject.asObservable();
  lastTargetDetail: any = {};

  constructor(
    private router: Router
  ) { }


  retrieveTargetDetailStore(): Observable<ITargetDetail> {
    return this.targetDetailStore$;
  }

  storeTargetDetailHeader(
    targetHeader: ITargetDetailHeader,
    nextRoute?: string
  ): void {
    this.updateTargetDetailStore( { target: targetHeader }, nextRoute );
  }

  storeTargetDetailInteractionsAndPtms(
    targetInteractions: ISubunitInteraction[],
    targetPtms: IPostTranslationalModification[],
    nextRoute?: string
  ): void {
    this.updateTargetDetailStore( { interactions: targetInteractions, ptms: targetPtms }, nextRoute );
  }

  updateTargetDetailStore(update: any, nextRoute?: string): void {
    this.lastTargetDetail = Object.assign(this.lastTargetDetail, update);
    this.targetDetailStoreSubject.next(this.lastTargetDetail);

    if (nextRoute !== undefined) {
      this.router.navigateByUrl(nextRoute);
    }
  }

  resetTargetDetailStore() {
    this.lastTargetDetail = {};
    this.targetDetailStoreSubject.next( null);
  }
}
