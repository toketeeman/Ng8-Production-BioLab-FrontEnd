import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";
import { environment } from "../../environments/environment";
import { IGridPlasmid, IGridPlasmidDetail, IGridTarget, ITargetDetail, IProteinClass } from "../protein-expression.interface";

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
        target_name: "protein x",
        target_id: "2345601",
        partner: "partner 1",
        class: "class 2",
        subunits: "3",
        geneCount: "3",
        project_name: "akita",
        plasmidCount: "4"
      },
      {
        target_name: "protein y",
        target_id: "2345602",
        partner: "partner 2",
        class: "class 1",
        subunits: "4",
        geneCount: "3",
        project_name: "collie",
        plasmidCount: "2"
      },
      {
        target_name: "protein z",
        target_id: "2345603",
        partner: "partner 3",
        class: "class 6",
        subunits: "1",
        geneCount: "2",
        project_name: "greyhound",
        plasmidCount: "4"
      },
      {
        target_name: "protein c",
        target_id: "2345604",
        partner: "partner 4",
        class: "class 5",
        subunits: "2",
        geneCount: "2",
        project_name: "pug",
        plasmidCount: "12"
      },
      {
        target_name: "protein d",
        target_id: "2345605",
        partner: "partner 5",
        class: "class 12",
        subunits: "1",
        geneCount: "4",
        project_name: "retriever",
        plasmidCount: "8"
      },
      {
        target_name: "protein q",
        target_id: "2345606",
        partner: "partner 6",
        class: "class 8",
        subunits: "1",
        geneCount: "6",
        project_name: "shepherd",
        plasmidCount: "2"
      },
      {
        target_name: "protein f",
        target_id: "2345607",
        partner: "partner 7",
        class: "class 4",
        subunits: "4",
        geneCount: "9",
        project_name: "akita",
        plasmidCount: "2"
      },
      {
        target_name: "protein x",
        target_id: "2345608",
        partner: "partner 8",
        class: "class 2",
        subunits: "4",
        geneCount: "3",
        project_name: "poodle",
        plasmidCount: "2"
      },
      {
        target_name: "protein d",
        target_id: "2345609",
        partner: "partner 9",
        class: "class 9",
        subunits: "3",
        geneCount: "4",
        project_name: "terrier",
        plasmidCount: "4"
      },
      {
        target_name: "protein m",
        target_id: "2345610",
        partner: "partner 10",
        class: "class 5",
        subunits: "1",
        geneCount: "2",
        project_name: "greyhound",
        plasmidCount: "8"
      },
      {
        target_name: "protein q",
        target_id: "2345611",
        partner: "partner 11",
        class: "class 4",
        subunits: "1",
        geneCount: "2",
        project_name: "daschund",
        plasmidCount: "6"
      },
      {
        target_name: "protein r",
        target_id: "2345612",
        partner: "partner 12",
        class: "class 3",
        subunits: "2",
        geneCount: "1",
        project_name: "pug",
        plasmidCount: "2"
      },
      {
        target_name: "protein x",
        target_id: "2345613",
        partner: "partner 13",
        class: "class 6",
        subunits: "8",
        geneCount: "5",
        project_name: "collie",
        plasmidCount: "2"
      },
      {
        target_name: "protein z",
        target_id: "2345614",
        partner: "partner 14",
        class: "class 3",
        subunits: "4",
        geneCount: "3",
        project_name: "corgi",
        plasmidCount: "6"
      },
      {
        target_name: "protein c",
        target_id: "2345615",
        partner: "partner 15",
        class: "class 5",
        subunits: "1",
        geneCount: "2",
        project_name: "husky",
        plasmidCount: "6"
      },
      {
        target_name: "protein r",
        target_id: "2345616",
        partner: "partner 16",
        class: "class 7",
        subunits: "1",
        geneCount: "4",
        project_name: "beagle",
        plasmidCount: "2"
      },
      {
        target_name: "protein m",
        target_id: "2345617",
        partner: "partner 17",
        class: "class 21",
        subunits: "1",
        geneCount: "4",
        project_name: "chihuahua",
        plasmidCount: "4"
      },
      {
        target_name: "protein f",
        target_id: "2345618",
        partner: "partner 18",
        class: "class 3",
        subunits: "3",
        geneCount: "11",
        project_name: "bulldog",
        plasmidCount: "2"
      },
      {
        target_name: "protein e",
        target_id: "2345619",
        partner: "partner 19",
        class: "class 6",
        subunits: "3",
        geneCount: "8",
        project_name: "collie",
        plasmidCount: "4"
      },
      {
        target_name: "protein y",
        target_id: "2345620",
        partner: "partner 20",
        class: "class 2",
        subunits: "1",
        geneCount: "2",
        project_name: "boxer",
        plasmidCount: "10"
      },
      {
        target_name: "protein g",
        target_id: "2345621",
        partner: "partner 21",
        class: "class 5",
        subunits: "2",
        geneCount: "3",
        project_name: "chihuahua",
        plasmidCount: "2"
      },
      {
        target_name: "protein f",
        target_id: "2345622",
        partner: "partner 22",
        class: "class 17",
        subunits: "2",
        geneCount: "2",
        project_name: "dobermann",
        plasmidCount: "2"
      },
      {
        target_name: "protein s",
        target_id: "2345623",
        partner: "partner 23",
        class: "class 1",
        subunits: "3",
        geneCount: "5",
        project_name: "bulldog",
        plasmidCount: "4"
      },
      {
        target_name: "protein z",
        target_id: "2345624",
        partner: "partner 24",
        class: "class 21",
        subunits: "3",
        geneCount: "6",
        project_name: "terrier",
        plasmidCount: "4"
      },
      {
        target_name: "protein q",
        target_id: "2345625",
        partner: "partner 25",
        class: "class 2",
        subunits: "3",
        geneCount: "6",
        project_name: "mastiff",
        plasmidCount: "4"
      },
      {
        target_name: "protein m",
        target_id: "234526",
        partner: "partner 26",
        class: "class 4",
        subunits: "1",
        geneCount: "1",
        project_name: "samoyed",
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

    const targetsDetail: ITargetDetail = {
      target: {
        target_name: "test target",
        target_id: "target_abcd",
        partner: "test partner",
        class: "Protein Class C",
        notes: "test notes - lots of them actually, incessantly on and on and on . . .",
        project_name: "test project",
        subunits: [
          {
            subunit_name: "test subunit A",
            copies: 2,
            amino_acid_fasta_description: "AA aa description",
            amino_acid_sequence: "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG",
            dna_fasta_description: "DNA aa description",
            dna_sequence: "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
          },
          {
            subunit_name: "test subunit B",
            copies: 1,
            amino_acid_fasta_description: "AA bb description",
            amino_acid_sequence: "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG",
            dna_fasta_description: "DNA bb description",
            dna_sequence: "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
          },
          {
            subunit_name: "test subunit C",
            copies: 3,
            amino_acid_fasta_description: "AA cc description",
            amino_acid_sequence: "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG",
            dna_fasta_description: "DNA cc description",
            dna_sequence: "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
          },
          {
            subunit_name: "test subunit D",
            copies: 1,
            amino_acid_fasta_description: "AA dd description",
            amino_acid_sequence: "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG",
            dna_fasta_description: "DNA dd description",
            dna_sequence: "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
          },
          {
            subunit_name: "test subunit E",
            copies: 4,
            amino_acid_fasta_description: "AA ee description",
            amino_acid_sequence: "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG",
            dna_fasta_description: "DNA ee description",
            dna_sequence: "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
          },
          {
            subunit_name: "test subunit F",
            copies: 3,
            amino_acid_fasta_description: "AA ff description",
            amino_acid_sequence: "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG",
            dna_fasta_description: "DNA ff description",
            dna_sequence: "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
          },
          {
            subunit_name: "test subunit G",
            copies: 1,
            amino_acid_fasta_description: "AA gg description",
            amino_acid_sequence: "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG",
            dna_fasta_description: "DNA gg description",
            dna_sequence: "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
              + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
              + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
          }
        ]
      },
      interactions: [
        {
          subunit_one_name: "test subunt A",
          subunit_one_copy: 2,
          subunit_two_name: "test subunt C",
          subunit_two_copy: 1,
          interaction: "covalent"
        },
        {
          subunit_one_name: "test subunt A",
          subunit_one_copy: 2,
          subunit_two_name: "test subunt F",
          subunit_two_copy: 1,
          interaction: "coolvalent"
        },
        {
          subunit_one_name: "test subunt B",
          subunit_one_copy: 1,
          subunit_two_name: "test subunt D",
          subunit_two_copy: 3,
          interaction: "warmvalent"
        },
        {
          subunit_one_name: "test subunt E",
          subunit_one_copy: 2,
          subunit_two_name: "test subunt A",
          subunit_two_copy: 4,
          interaction: "covalent"
        },
        {
          subunit_one_name: "test subunt C",
          subunit_one_copy: 1,
          subunit_two_name: "test subunt A",
          subunit_two_copy: 1,
          interaction: "nicevalent"
        }
      ],
      ptms: [
        {
          subunit_one_name: "test subunt G",
          subunit_one_residue: 3,
          subunit_two_name: "test subunt F",
          subunit_two_residue: 2,
          ptm: "disulfide_bond"
        },
        {
          subunit_one_name: "test subunt D",
          subunit_one_residue: 1,
          subunit_two_name: "test subunt B",
          subunit_two_residue: 2,
          ptm: "trisulfide_bond"
        },
        {
          subunit_one_name: "test subunt B",
          subunit_one_residue: 1,
          subunit_two_name: "test subunt B",
          subunit_two_residue: 3,
          ptm: "pentasulfide_bond"
        },
        {
          subunit_one_name: "test subunt E",
          subunit_one_residue: 2,
          subunit_two_name: "test subunt G",
          subunit_two_residue: 2,
          ptm: "disulfide_bond"
        }
      ]
    };

    const proteinClasses: IProteinClass[] = [
      {
        protein_class_name: "protein class1 name",
        protein_class_pk: "1"
      },
      {
        protein_class_name: "protein class2 name",
        protein_class_pk: "2"
      },
      {
        protein_class_name: "protein class3 name",
        protein_class_pk: "3"
      },
      {
        protein_class_name: "protein class4 name",
        protein_class_pk: "4"
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
      targetsDetail,
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
    if (url === environment.urls.targetUrl) {
      return this.registerTarget(reqInfo);
    }

    if (url === environment.urls.fastaUrl) {
      return this.uploadFastaFile(reqInfo);
    }

    if (url === environment.urls.loginUrl) {
      return this.handleAuth(reqInfo);
    }

    if (url === environment.urls.interactionsUrl) {
      return this.registerInteractions(reqInfo);
    }

    if (url === environment.urls.ptmsUrl) {
      return this.registerPtms(reqInfo);
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

  registerTarget(reqInfo: any): ResponseOptions {
    return reqInfo.utils.createResponse$(() => {
      const responseData = this.formatTargetResponse(reqInfo.req.body);
      const options: ResponseOptions = {
        body: responseData,
        status: STATUS.OK
      };
      return this.finishOptions(options, reqInfo);
    });
  }

  // Respond back with back-end format with updated target id.
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
      project: data.project,
      subunits
    };
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

  registerPtms(reqInfo: any) {
    return reqInfo.utils.createResponse$(() => {
      const responseData = reqInfo.req.body;
      const options: ResponseOptions = {
        body: responseData,
        status: STATUS.OK
      };

      return this.finishOptions(options, reqInfo);
    });
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



  /////////// helpers ///////////////
  private finishOptions(
    options: ResponseOptions,
    { headers, url }: RequestInfo
  ): ResponseOptions {
    options.statusText = getStatusText(options.status);
    options.headers = headers;
    options.url = url;
    return options;
  }
}
