import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TargetSearchStoreService {
  private searchState: string[] = [];

  constructor() { }

  resetTargetSearchState() {
    this.searchState = [];
  }

  retrieveTargetSearchState(): string[] {
    return this.searchState;
  }

  storeTargetSearchState(searchState: string[]): void {
    this.searchState = searchState;
  }
}
