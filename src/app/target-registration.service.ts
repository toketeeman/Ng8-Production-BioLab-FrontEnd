import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class TargetRegistrationService {
  constructor() {}

  // @TODO is registerTarget a separate API call from registerInteractions
  registerTarget() {}

  registerInteractions() {}

  getProteinClasses() {} // retrieve protein classes list to populate form dropdown
}
