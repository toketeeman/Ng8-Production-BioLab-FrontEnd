import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Router } from "@angular/router";

import {
  ITargetDetail,
  ITargetDetailHeader,
  ISubunitInteraction,
  IPostTranslationalModification } from '../protein-expression.interface';
import { ProteinClassesService } from "../services/protein-classes.service";

@Injectable({
  providedIn: 'root'
})
export class TargetDetailStoreService {
  private targetDetailStoreSubject = new BehaviorSubject<ITargetDetail>( {} as ITargetDetail );
  targetDetailStore$ = this.targetDetailStoreSubject.asObservable();

  constructor(
    private router: Router,
    private proteinClassesService: ProteinClassesService
  ) { }


  retrieveTargetDetailStore(): Observable<ITargetDetail> {
    return this.targetDetailStore$;
  }

  storeTargetDetailHeader(targetHeader: ITargetDetailHeader, nextRoute?: string): Subscription {
    return this.updateTargetDetailStore( { target: targetHeader }, nextRoute);
  }

  storeTargetDetailInteractionsAndPtms(
    targetInteractions: ISubunitInteraction[],
    targetPtms: IPostTranslationalModification[],
    nextRoute: string
  ): Subscription {
    return this.updateTargetDetailStore( { interactions: targetInteractions, ptms: targetPtms }, nextRoute);
  }

  updateTargetDetailStore(update: any, nextRoute?: string): Subscription {
    const updateSubscription =
      this.targetDetailStore$.subscribe( (targetDetail: ITargetDetail) => {
        const updatedTargetDetail: ITargetDetail = Object.assign(targetDetail, update);
        const immutableTargetDetail: ITargetDetail = { ...updatedTargetDetail };
        this.targetDetailStoreSubject.next(immutableTargetDetail);

        if (nextRoute !== undefined) {
          this.router.navigateByUrl(nextRoute);
        }
      });
    return updateSubscription;
  }

  resetTargetDetailStore() {
    this.targetDetailStoreSubject.next({} as ITargetDetail);
  }
}
