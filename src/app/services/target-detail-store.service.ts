import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
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


  retrieveProteinClasses(): Observable<ITargetDetail> {
    return this.targetDetailStore$;
  }

  storeTargetDetailHeader(targetHeader: ITargetDetailHeader, nextRoute?: string) {
    this.updateTargetDetailStore( { target: targetHeader }, nextRoute);
  }

  storeTargetDetailInteractions(targetInteractions: ISubunitInteraction[], nextRoute: string) {
    this.updateTargetDetailStore( { interactions: targetInteractions }, nextRoute);
  }

  storeTargetDetailPtms(targetPtms: IPostTranslationalModification[], nextRoute: string) {
    this.updateTargetDetailStore( { ptms: targetPtms }, nextRoute);
  }

  updateTargetDetailStore(update: any, nextRoute?: string) {
    this.targetDetailStore$.subscribe( (targetDetail: ITargetDetail) => {
      const updatedTargetDetail: ITargetDetail = Object.assign(targetDetail, update);
      const immutableTargetDetail: ITargetDetail = { ...updatedTargetDetail };
      this.targetDetailStoreSubject.next(immutableTargetDetail);

      if (nextRoute !== undefined) {
        this.router.navigateByUrl(nextRoute);
      }
    });
  }
}
