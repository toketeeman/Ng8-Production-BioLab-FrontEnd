import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { devUrls } from "../../environments/environment-urls";
import { IGridPlasmid, IGridPlasmidDetail, IGridTarget, ITargetDetail } from "../protein-expression.interface";

import {
  ParsedRequestUrl,
  RequestInfo,
  RequestInfoUtilities,
  ResponseOptions,
  getStatusText,
  STATUS
} from "angular-in-memory-web-api";
import { ITarget } from "../protein-expression.interface";

const specialUsers = [
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

    const targets: IGridTarget[] = [
      {
        target: "protein x",
        partner: "partner 1",
        class: "class 2",
        subunits: "3",
        geneCount: "3",
        project: "akita",
        plasmidCount: "4"
      },
      {
        target: "protein y",
        partner: "partner 2",
        class: "class 1",
        subunits: "4",
        geneCount: "3",
        project: "collie",
        plasmidCount: "2"
      },
      {
        target: "protein z",
        partner: "partner 3",
        class: "class 6",
        subunits: "1",
        geneCount: "2",
        project: "greyhound",
        plasmidCount: "4"
      },
      {
        target: "protein c",
        partner: "partner 4",
        class: "class 5",
        subunits: "2",
        geneCount: "2",
        project: "pug",
        plasmidCount: "12"
      },
      {
        target: "protein d",
        partner: "partner 5",
        class: "class 12",
        subunits: "1",
        geneCount: "4",
        project: "retriever",
        plasmidCount: "8"
      },
      {
        target: "protein q",
        partner: "partner 6",
        class: "class 8",
        subunits: "1",
        geneCount: "6",
        project: "shepherd",
        plasmidCount: "2"
      },
      {
        target: "protein f",
        partner: "partner 7",
        class: "class 4",
        subunits: "4",
        geneCount: "9",
        project: "akita",
        plasmidCount: "2"
      },
      {
        target: "protein x",
        partner: "partner 8",
        class: "class 2",
        subunits: "4",
        geneCount: "3",
        project: "poodle",
        plasmidCount: "2"
      },
      {
        target: "protein d",
        partner: "partner 9",
        class: "class 9",
        subunits: "3",
        geneCount: "4",
        project: "terrier",
        plasmidCount: "4"
      },
      {
        target: "protein m",
        partner: "partner 10",
        class: "class 5",
        subunits: "1",
        geneCount: "2",
        project: "greyhound",
        plasmidCount: "8"
      },
      {
        target: "protein q",
        partner: "partner 11",
        class: "class 4",
        subunits: "1",
        geneCount: "2",
        project: "daschund",
        plasmidCount: "6"
      },
      {
        target: "protein r",
        partner: "partner 12",
        class: "class 3",
        subunits: "2",
        geneCount: "1",
        project: "pug",
        plasmidCount: "2"
      },
      {
        target: "protein x",
        partner: "partner 13",
        class: "class 6",
        subunits: "8",
        geneCount: "5",
        project: "collie",
        plasmidCount: "2"
      },
      {
        target: "protein z",
        partner: "partner 14",
        class: "class 3",
        subunits: "4",
        geneCount: "3",
        project: "corgi",
        plasmidCount: "6"
      },
      {
        target: "protein c",
        partner: "partner 15",
        class: "class 5",
        subunits: "1",
        geneCount: "2",
        project: "husky",
        plasmidCount: "6"
      },
      {
        target: "protein r",
        partner: "partner 16",
        class: "class 7",
        subunits: "1",
        geneCount: "4",
        project: "beagle",
        plasmidCount: "2"
      },
      {
        target: "protein m",
        partner: "partner 17",
        class: "class 21",
        subunits: "1",
        geneCount: "4",
        project: "chihuahua",
        plasmidCount: "4"
      },
      {
        target: "protein f",
        partner: "partner 18",
        class: "class 3",
        subunits: "3",
        geneCount: "11",
        project: "bulldog",
        plasmidCount: "2"
      },
      {
        target: "protein e",
        partner: "partner 19",
        class: "class 6",
        subunits: "3",
        geneCount: "8",
        project: "collie",
        plasmidCount: "4"
      },
      {
        target: "protein y",
        partner: "partner 20",
        class: "class 2",
        subunits: "1",
        geneCount: "2",
        project: "boxer",
        plasmidCount: "10"
      },
      {
        target: "protein g",
        partner: "partner 21",
        class: "class 5",
        subunits: "2",
        geneCount: "3",
        project: "chihuahua",
        plasmidCount: "2"
      },
      {
        target: "protein f",
        partner: "partner 22",
        class: "class 17",
        subunits: "2",
        geneCount: "2",
        project: "dobermann",
        plasmidCount: "2"
      },
      {
        target: "protein s",
        partner: "partner 23",
        class: "class 1",
        subunits: "3",
        geneCount: "5",
        project: "bulldog",
        plasmidCount: "4"
      },
      {
        target: "protein z",
        partner: "partner 24",
        class: "class 21",
        subunits: "3",
        geneCount: "6",
        project: "terrier",
        plasmidCount: "4"
      },
      {
        target: "protein q",
        partner: "partner 25",
        class: "class 2",
        subunits: "3",
        geneCount: "6",
        project: "mastiff",
        plasmidCount: "4"
      },
      {
        target: "protein m",
        partner: "partner 26",
        class: "class 4",
        subunits: "1",
        geneCount: "1",
        project: "samoyed",
        plasmidCount: "2"
      }
    ];

    const plasmids: IGridPlasmid[]  = [
      {
        plasmid_id: "PL4523",
        description: "Description A",
        marker: "kanamycin",
        target_name: "protein x",
        project_name: "Akita"
      },
      {
        plasmid_id: "PL4544",
        description: "Description B",
        marker: "tetracycline",
        target_name: "protein y",
        project_name: "Doberman"
      },
      {
        plasmid_id: "PL1233",
        description: "Description C",
        marker: "ampicillin,kanamycin",
        target_name: "protein z",
        project_name: "Daschhund"
      },
      {
        plasmid_id: "PL5678",
        description: "Description D",
        marker: "carbenicillin",
        target_name: "protein d",
        project_name: "Collie"
      },
      {
        plasmid_id: "PL9821",
        description: "Description E",
        marker: "clindamycin,trimethoprim",
        target_name: "protein e",
        project_name: "Retriever"
      },
      {
        plasmid_id: "PL1074",
        description: "Description F",
        marker: "kanamycin",
        target_name: "protein f",
        project_name: "Greyhound"
      },
      {
        plasmid_id:  "PL2223",
        description: "Description G",
        marker: "sulfamethoxazole ",
        target_name: "protein x",
        project_name: "Pug"
      },
      {
        plasmid_id:  "PL4535",
        description: "Description H",
        marker: "trimethoprim,metronidazole,doxycycline",
        target_name: "protein e",
        project_name: "Husky"
      },
      {
        plasmid_id:  "PL9623",
        description: "Description I",
        marker: "clindamycin",
        target_name: "protein s",
        project_name: "Bulldog"
      },
      {
        plasmid_id:  "PL0723",
        description: "Description J",
        marker: "metronidazole",
        target_name: "protein t",
        project_name: "Maltese"
      },
      {
        plasmid_id:  "PL5023",
        description: "Description K",
        marker: "azithromycin",
        target_name: "protein y",
        project_name: "Akita"
      },
      {
        plasmid_id: "PL5824",
        description: "Description L",
        marker: "ciprofloxacin",
        target_name: "protein z",
        project_name: "Husky"
      },
      {
        plasmid_id: "PL8223",
        description: "Description M",
        marker: "amoxicillin",
        target_name: "protein x",
        project_name: "Pug"
      },
      {
        plasmid_id: "PL3023",
        description: "Description N",
        marker: "doxycycline",
        target_name: "protein d",
        project_name: "Husky"
      },
      {
        plasmid_id: "PL9333",
        description: "Description O",
        marker: "cephalexin",
        target_name: "protein s",
        project_name: "Beagle"
      }
    ];

    const plasmidsDetail: IGridPlasmidDetail[] = [
      {
        name: "STOP_TAA",
        feature_type: "gene",
        sequence_span: "[1778:1781](+)",
        strand: "1",
        dna_sequence: "TAA",
        feature_qualifier: [
          {
            type: "standard_name",
            value: "STOP"
          }
        ]
      },
      {
        name: "P_prpR",
        feature_type: "regulatory",
        sequence_span: "[1781:1926](-)",
        strand: "-1",
        dna_sequence: "TACATTGACTATATACATACCGAGGACCATGCATAATT",
        feature_qualifier: [
          {
            type: "standard_name",
            value: "P_prpR"
          },
          {
            type: "regulatory class",
            value: "promoter"
          }
        ]
      },
      {
        name: "P_prpB",
        feature_type: "regulatory",
        sequence_span: "[194:1781](+)",
        strand: "1",
        dna_sequence: "AAGCCTATGCCCTAGGCATCGACTACGACTACGACTACGCGTA" +
                  "CTCGCCGAAAGCCATAGGATTTCACGCTACGATACTGCATGACGTA",
        feature_qualifier: [
          {
            type: "standard_name",
            value: "P_prpR"
          },
          {
            type: "regulatory class",
            value: "promoter"
          }
        ]
      },
      {
        name: "cDsbC",
        feature_type: "CDS",
        sequence_span: "[2032:2719](+)",
        strand: "1",
        dna_sequence: "AACGTCTGCGCGGCGGATGATAGAGCGATGCAATCGCA" +
                  "TACTAACGTAGATGCACATACATGAGTGACTAGATAGC" +
                  "ATATACACTCGACGCAAAAAGCGTGCACGTAATGCAGC" +
                  "TATGACATAATGCAGTACGCCAGTATTTTAAGCCTATG" +
                  "CCCTAGGCATCGACTACGACTACGACTACGCGTACTCG" +
                  "CCGAAAGCCATAGGATTTCACGCTACGATACTGCATGA",
        feature_qualifier: [
          {
            type: "pseudo",
            value: ""
          },
          {
            type: "standard name",
            value: "cDsbC"
          },
          {
            type: "codon_start",
            value: "1"
          },
          {
            type: "transl_table",
            value: "11"
          },
          {
            type: "locus_tag",
            value: "1"
          },
          {
            type: "product",
            value: "protein-disulfide isomerase"
          },
          {
            type: "note",
            value: "DsbC; periplasmic protein with protein disulfide " +
                   "isomerase activity; this protein also shows disulfideoxidoreductase " +
                   "activityDerived by automated computational analysis using gene prediction method: Protein Homology."
          },
          {
            type: "protein_id",
            value: "AMH25928.1"
          },
          {
            type: "translation",
            value: "MAITISHRKQTMDDAAIQQTLAKMGIKSSDIQPAPVA.GMKTVLTNSGVLYITDDGKHIIQGPMYDVSGTAPVN."
          }
        ]
      }
    ];

    const targetDetail: ITargetDetail = {
      target: {
        target_name: "test target",
        partner: "test partner",
        protein_class_pk: 1,
        notes: "test notes",
        project_name: "test project",
        subunits: [
          {
            subunit_name: "test subunit",
            copies: 2,
            amino_acid_fasta_description: "aa description",
            amino_acid_sequence: "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG",
            dna_fasta_description: "dna description",
            dna_sequence: "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
          }
        ]
      },
      interactions: [
        {
          subunit_one_name: "interaction subunit name 1",
          subunit_one_copy: 2,
          subunit_two_name: "interaction subunit name 2",
          subunit_two_copy: 1,
          interaction: "covalent"
        }
      ],
      ptms: [
        {
          subunit_one_name: "ptms subunit name 1",
          subunit_one_residue: 3,
          subunit_two_name: "ptms subunit name 1",
          subunit_two_residue: 2,
          ptm: "disulfide_bond"
        }
      ]
    };

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
      plasmidsDetail,
      targetDetail,
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
    const filtered = specialUsers.filter(
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
