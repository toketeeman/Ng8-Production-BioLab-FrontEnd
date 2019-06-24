import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable()

export class InMemoryDataService {
  createDb() {
    const proteinClasses = [
      {
        protein_class_name: "protein class1 name",
        protein_class_pk_id: 1
      },
      {
        protein_class_name: "protein class2 name",
        protein_class_pk_id: 2
      },
      {
        protein_class_name: "protein class3 name",
        protein_class_pk_id: 3
      },
      {
        protein_class_name: "protein class4 name",
        protein_class_pk_id: 4
      },
    ];

    const proteinTargets = [];
    return {proteinClasses, proteinTargets};
  }

  constructor() { }
}
