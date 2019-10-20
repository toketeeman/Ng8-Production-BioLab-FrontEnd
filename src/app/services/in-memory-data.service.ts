import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { devUrls } from "../../environments/environment-urls";

import {
  ParsedRequestUrl,
  RequestInfo,
  RequestInfoUtilities,
  ResponseOptions,
  getStatusText,
  STATUS
} from "angular-in-memory-web-api";
import { ITarget } from "../protein-expression.interface";

const users = [
  {
    username: "user1",
    password: "password1"
  }
];

@Injectable()
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const users = [
      {
        username: "user1",
        password: "password1"
      }
    ];
    const targets = [
      {
        target: "protein x",
        partner: "partner 1",
        subunits: "3",
        project: "akita",
        plasmidCount: "4",
        ptms: "DiSulfide bond(1)"
      },
      {
        target: "protein y",
        partner: "partner 2",
        subunits: "4",
        project: "collie",
        plasmidCount: "2",
        ptms: "DiSulfide bond(3)"
      },
      {
        target: "protein z",
        partner: "partner 3",
        subunits: "1",
        project: "greyhound",
        plasmidCount: "4",
        ptms: "DiSulfide bond(2)"
      },
      {
        target: "protein c",
        partner: "partner 4",
        subunits: "2",
        project: "pug",
        plasmidCount: "12",
        ptms: "DiSulfide bond(2)"
      },
      {
        target: "protein d",
        partner: "partner 5",
        subunits: "1",
        project: "retriever",
        plasmidCount: "8",
        ptms: "DiSulfide bond(4)"
      },
      {
        target: "protein q",
        partner: "partner 6",
        subunits: "1",
        project: "shepherd",
        plasmidCount: "2",
        ptms: "DiSulfide bond(6)"
      },
      {
        target: "protein f",
        partner: "partner 7",
        subunits: "4",
        project: "akita",
        plasmidCount: "2",
        ptms: "DiSulfide bond(9)"
      },
      {
        target: "protein x",
        partner: "partner 8",
        subunits: "4",
        project: "poodle",
        plasmidCount: "2",
        ptms: "DiSulfide bond(3)"
      },
      {
        target: "protein d",
        partner: "partner 9",
        subunits: "3",
        project: "terrier",
        plasmidCount: "4",
        ptms: "DiSulfide bond(4)"
      },
      {
        target: "protein m",
        partner: "partner 10",
        subunits: "1",
        project: "greyhound",
        plasmidCount: "8",
        ptms: "DiSulfide bond(2)"
      },
      {
        target: "protein q",
        partner: "partner 11",
        subunits: "1",
        project: "daschund",
        plasmidCount: "6",
        ptms: "DiSulfide bond(2)"
      },
      {
        target: "protein r",
        partner: "partner 12",
        subunits: "2",
        project: "pug",
        plasmidCount: "2",
        ptms: "DiSulfide bond(1)"
      },
      {
        target: "protein x",
        partner: "partner 13",
        subunits: "1",
        project: "collie",
        plasmidCount: "2",
        ptms: "DiSulfide bond(5)"
      },
      {
        target: "protein z",
        partner: "partner 14",
        subunits: "4",
        project: "corgi",
        plasmidCount: "6",
        ptms: "DiSulfide bond(3)"
      },
      {
        target: "protein c",
        partner: "partner 15",
        subunits: "1",
        project: "husky",
        plasmidCount: "6",
        ptms: "DiSulfide bond(2)"
      },
      {
        target: "protein r",
        partner: "partner 16",
        subunits: "1",
        project: "beagle",
        plasmidCount: "2",
        ptms: "DiSulfide bond(4)"
      },
      {
        target: "protein m",
        partner: "partner 17",
        subunits: "1",
        project: "chihuahua",
        plasmidCount: "4",
        ptms: "DiSulfide bond(4)"
      },
      {
        target: "protein f",
        partner: "partner 18",
        subunits: "3",
        project: "bulldog",
        plasmidCount: "2",
        ptms: "DiSulfide bond(11)"
      },
      {
        target: "protein e",
        partner: "partner 19",
        subunits: "3",
        project: "collie",
        plasmidCount: "4",
        ptms: "DiSulfide bond(8)"
      },
      {
        target: "protein y",
        partner: "partner 20",
        subunits: "1",
        project: "boxer",
        plasmidCount: "10",
        ptms: "DiSulfide bond(2)"
      },
      {
        target: "protein g",
        partner: "partner 21",
        subunits: "2",
        project: "chihuahua",
        plasmidCount: "2",
        ptms: "DiSulfide bond(3)"
      },
      {
        target: "protein f",
        partner: "partner 22",
        subunits: "2",
        project: "dobermann",
        plasmidCount: "2",
        ptms: "DiSulfide bond(2)"
      },
      {
        target: "protein s",
        partner: "partner 23",
        subunits: "1",
        project: "bulldog",
        plasmidCount: "4",
        ptms: "DiSulfide bond(5)"
      },
      {
        target: "protein z",
        partner: "partner 24",
        subunits: "3",
        project: "terrier",
        plasmidCount: "4",
        ptms: "DiSulfide bond(6)"
      },
      {
        target: "protein q",
        partner: "partner 25",
        subunits: "3",
        project: "mastiff",
        plasmidCount: "4",
        ptms: "DiSulfide bond(6)"
      },
      {
        target: "protein m",
        partner: "partner 26",
        subunits: "1",
        project: "samoyed",
        plasmidCount: "2",
        ptms: "DiSulfide bond(1)"
      }
    ];
    const plasmids = [
      {
        plasmidId: "PL4523",
        description: "Description A",
        markers: "kanamycin",
        protein: "protein x",
        project: "Akita",
        slimsId: "PL4523"
      },
      {
        plasmidId: "PL4544",
        description: "Description B",
        markers: "tetracycline",
        protein: "protein y",
        project: "Doberman",
        slimsId: "PL4544"
      },
      {
        plasmidId: "PL1233",
        description: "Description C",
        markers: "ampicillin,kanamycin",
        protein: "protein z",
        project: "Daschhund",
        slimsId: "PL1233"
      },
      {
        plasmidId: "PL5678",
        description: "Description D",
        markers: "carbenicillin",
        protein: "protein d",
        project: "Collie",
        slimsId: "PL5678"
      },
      {
        plasmidId: "PL9821",
        description: "Description E",
        markers: "clindamycin,trimethoprim",
        protein: "protein e",
        project: "Retriever",
        slimsId: "PL9821"
      },
      {
        plasmidId: "PL1074",
        description: "Description F",
        markers: "kanamycin",
        protein: "protein f",
        project: "Greyhound",
        slimsId: "PL1074"
      },
      {
        plasmidId: "PL2223",
        description: "Description G",
        markers: "sulfamethoxazole ",
        protein: "protein x",
        project: "Pug",
        slimsId: "PL2223"
      },
      {
        plasmidId: "PL4535",
        description: "Description H",
        markers: "trimethoprim,metronidazole,doxycycline",
        protein: "protein e",
        project: "Husky",
        slimsId: "PL4535"
      },
      {
        plasmidId: "PL9623",
        description: "Description I",
        markers: "clindamycin",
        protein: "protein s",
        project: "bulldog",
        slimsId: "PL9623"
      },
      {
        plasmidId: "PL0723",
        description: "Description J",
        markers: "metronidazole",
        protein: "protein t",
        project: "Maltese",
        slimsId: "PL0723"
      },
      {
        plasmidId: "PL5023",
        description: "Description K",
        markers: "azithromycin",
        protein: "protein y",
        project: "Akita",
        slimsId: "PL5023"
      },
      {
        plasmidId: "PL5824",
        description: "Description L",
        markers: "ciprofloxacin",
        protein: "protein z",
        project: "Husky",
        slimsId: "PL5824"
      },
      {
        plasmidId: "PL8223",
        description: "Description M",
        markers: "amoxicillin",
        protein: "protein x",
        project: "Pug",
        slimsId: "PL8223"
      },
      {
        plasmidId: "PL3023",
        description: "Description N",
        markers: "doxycycline",
        protein: "protein d",
        project: "Huskyta",
        slimsId: "PL3023"
      },
      {
        plasmidId: "PL9333",
        description: "Description O",
        markers: "cephalexin",
        protein: "protein s",
        project: "Beagle",
        slimsId: "PL9333"
      }
    ];
    const proteinClasses = [
      {
        protein_class_name: "protein class1 name",
        protein_class_pk: 1
      },
      {
        protein_class_name: "protein class2 name",
        protein_class_pk: 2
      },
      {
        protein_class_name: "protein class3 name",
        protein_class_pk: 3
      },
      {
        protein_class_name: "protein class4 name",
        protein_class_pk: 4
      }
    ];

    const proteinTargets = [];
    const fastaFiles = [];
    const subunitInteractions = [];
    const postTranslationalModifications = [];

    return {
      users,
      targets,
      plasmids,
      proteinClasses,
      proteinTargets,
      fastaFiles,
      subunitInteractions,
      postTranslationalModifications
    };
  }

  // POST interceptor that returns custom response objects

  post(reqInfo: RequestInfo) {
    // Keep handy for now.
    //
    // console.log(
    //   "InMemoryDataService: post(): reqInfo = ",
    //   JSON.stringify(reqInfo)
    // );
    const url = reqInfo.url;
    if (url === devUrls.targetUrl) {
      return this.registerTarget(reqInfo);
    }

    if (url === devUrls.fastaUrl) {
      return this.uploadFastaFile(reqInfo);
    }

    if (url === devUrls.loginUrl) {
      return this.handleAuth(reqInfo);
    }

    if (url === devUrls.interactionsUrl || url === devUrls.ptmsUrl) {
      return this.registerInteractions(reqInfo);
    }
  }

  // GET interceptor that returns custom response objects
  // (left here only for possible future reference)

  // get(reqInfo: RequestInfo) {
  //   console.log(
  //     "InMemoryDataService: get(): reqInfo = ",
  //     JSON.stringify(reqInfo)
  //   );
  //   const url = reqInfo.url;
  //   if (url === . . . ") {
  //     //return a http response
  //   }
  // }

  // This library requires that all items in a collection have a numerical id
  // if one has not been provided in the actual data.
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

  formatTargetResponse(data: any) {
    const subunits = data.subunits.map(unit => {
      unit.subunit_id = Math.floor(Math.random() * Math.floor(99));
      return unit;
    });

    return {
      target: data.target,
      partner: data.partner,
      id: 1234,
      protein_class_pk: data.protein_class_pk,
      notes: data.notes,
      project_name: data.project_name,
      subunits
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
      // const options: ResponseOptions = {
      //   body: { non_field_errors: ["bad file"] },
      //   status: STATUS.BAD_REQUEST
      // };
      return this.finishOptions(options, reqInfo);
    });
  }

  handleAuth(reqInfo: any) {
    return reqInfo.utils.createResponse$(() => {
      const { username, password } = reqInfo.req.body;
      const isValidUser = this.isValidUser(username, password);

      const options: ResponseOptions = isValidUser
        ? {
            body: { key: "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b" },
            status: STATUS.OK
          }
        : {
            body: { error: "Unable to log in with provided credentials." },
            status: STATUS.FORBIDDEN
          };
      return this.finishOptions(options, reqInfo);
    });
  }

  isValidUser(username, password) {
    const filtered = users.filter(
      user => user.username === username && user.password === password
    );
    return filtered.length > 0 ? true : false;
  }

  registerInteractions(reqInfo: any) {
    return reqInfo.utils.createResponse$(() => {
      const responseData = reqInfo.req.body;

      const options: ResponseOptions = {
        body: responseData,
        status: STATUS.OK
      };

      return this.finishOptions(options, reqInfo);
    });
  }

  getProteinClasses(reqInfo: any) {
    return true;
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
