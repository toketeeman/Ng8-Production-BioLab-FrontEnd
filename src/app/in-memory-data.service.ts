import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";

import {
  ParsedRequestUrl,
  RequestInfo,
  RequestInfoUtilities,
  ResponseOptions,
  getStatusText,
  STATUS
} from "angular-in-memory-web-api";
import { ITarget } from "./protein-expression.interface";

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
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
      }
    ];

    const proteinTargets = [];
    const fastaFiles = [];
    return { proteinClasses, proteinTargets, fastaFiles };
  }

  // POST interceptor that returns custom response objects

  post(reqInfo: RequestInfo) {
    const collectionName = reqInfo.collectionName;
    if (collectionName === "proteinTargets") {
      return this.registerTarget(reqInfo);
    }

    if (collectionName === "fastaFiles") {
      return this.uploadFastaFile(reqInfo);
    }
  }

  // this library requires that all items in a collection have a numerical id
  genId(proteinTargets: any[]): number {
    return proteinTargets.length > 0
      ? Math.max(...proteinTargets.map(target => target.id)) + 1
      : 1;
  }

  registerTarget(reqInfo: any) {
    return reqInfo.utils.createResponse$(() => {
      const responseData = this.formatTargetResponse(reqInfo.req.body);
      const options: ResponseOptions = {
        body: responseData,
        status: STATUS.OK
      };
      return this.finishOptions(options, reqInfo);
    });
  }

  formatTargetResponse(data: ITarget) {
    return {
      target: data.target,
      partner: data.partner,
      id: 1234,
      protein_class_pk: data.protein_class_pk,
      notes: data.notes,
      project_name: data.project,
      subunits: data.subunits
    };
  }

  uploadFastaFile(reqInfo: any) {
    return reqInfo.utils.createResponse$(() => {
      const responseData = {
        sequence_type: reqInfo.req.body.sequence_type,
        expected_entry_count: 1,
        actual_entry_count: 1,
        fasta_entries: [
          {
            fasta_description: "Example Fasta Header String",
            sequence_type: reqInfo.req.body.sequence_type,
            sequence: "ATCGGCTAGCTAGCATCGATCGA"
          }
        ]
      };

      const options: ResponseOptions = {
        body: responseData,
        status: STATUS.OK
      };
      return this.finishOptions(options, reqInfo);
    });
  }

  /////////// helpers ///////////////
  private finishOptions(
    options: ResponseOptions,
    { headers, url }: RequestInfo
  ) {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
