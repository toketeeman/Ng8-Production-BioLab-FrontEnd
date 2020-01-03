import { Injectable } from "@angular/core";

import {
  InMemoryDbService ,
  ParsedRequestUrl,
  RequestInfo,
  RequestInfoUtilities,
  ResponseOptions,
  getStatusText,
  STATUS
} from "angular-in-memory-web-api";

import { environment } from "../../environments/environment";
import {
  IGridPlasmid,
  IGridPlasmidDetail,
  IGridTarget,
  ITargetDetail,
  IProteinClass,
  ITargetProperties,
  ITargetPropertyList } from "../protein-expression.interface";

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
        target_id: 2345601,
        partner_name: "partner 1",
        class_name: "class 2",
        subunit_count: 3,
        gene_count: 3,
        project_name: "akita",
        plasmid_count: 4
      },
      {
        target_name: "protein y",
        target_id: 2345602,
        partner_name: "partner 2",
        class_name: "class 1",
        subunit_count: 4,
        gene_count: 3,
        project_name: "collie",
        plasmid_count: 2
      },
      {
        target_name: "protein z",
        target_id: 2345603,
        partner_name: "partner 3",
        class_name: "class 6",
        subunit_count: 1,
        gene_count: 2,
        project_name: "greyhound",
        plasmid_count: 4
      },
      {
        target_name: "protein c",
        target_id: 2345604,
        partner_name: "partner 4",
        class_name: "class 5",
        subunit_count: 2,
        gene_count: 2,
        project_name: "pug",
        plasmid_count: 12
      },
      {
        target_name: "protein d",
        target_id: 2345605,
        partner_name: "partner 5",
        class_name: "class 12",
        subunit_count: 1,
        gene_count: 4,
        project_name: "retriever",
        plasmid_count: 8
      },
      {
        target_name: "protein q",
        target_id: 2345606,
        partner_name: "partner 6",
        class_name: "class 8",
        subunit_count: 1,
        gene_count: 6,
        project_name: "shepherd",
        plasmid_count: 2
      },
      {
        target_name: "protein f",
        target_id: 2345607,
        partner_name: "partner 7",
        class_name: "class 4",
        subunit_count: 4,
        gene_count: 9,
        project_name: "akita",
        plasmid_count: 2
      },
      {
        target_name: "protein x",
        target_id: 2345608,
        partner_name: "partner 8",
        class_name: "class 2",
        subunit_count: 4,
        gene_count: 3,
        project_name: "poodle",
        plasmid_count: 2
      },
      {
        target_name: "protein d",
        target_id: 2345609,
        partner_name: "partner 9",
        class_name: "class 9",
        subunit_count: 3,
        gene_count: 4,
        project_name: "terrier",
        plasmid_count: 4
      },
      {
        target_name: "protein m",
        target_id: 2345610,
        partner_name: "partner 10",
        class_name: "class 5",
        subunit_count: 1,
        gene_count: 2,
        project_name: "greyhound",
        plasmid_count: 8
      },
      {
        target_name: "protein q",
        target_id: 2345611,
        partner_name: "partner 11",
        class_name: "class 4",
        subunit_count: 1,
        gene_count: 2,
        project_name: "daschund",
        plasmid_count: 6
      },
      {
        target_name: "protein r",
        target_id: 2345612,
        partner_name: "partner 12",
        class_name: "class 3",
        subunit_count: 2,
        gene_count: 1,
        project_name: "pug",
        plasmid_count: 2
      },
      {
        target_name: "protein x",
        target_id: 2345613,
        partner_name: "partner 13",
        class_name: "class 6",
        subunit_count: 8,
        gene_count: 5,
        project_name: "collie",
        plasmid_count: 2
      },
      {
        target_name: "protein z",
        target_id: 2345614,
        partner_name: "partner 14",
        class_name: "class 3",
        subunit_count: 4,
        gene_count: 3,
        project_name: "corgi",
        plasmid_count: 6
      },
      {
        target_name: "protein c",
        target_id: 2345615,
        partner_name: "partner 15",
        class_name: "class 5",
        subunit_count: 1,
        gene_count: 2,
        project_name: "husky",
        plasmid_count: 6
      },
      {
        target_name: "protein r",
        target_id: 2345616,
        partner_name: "partner 16",
        class_name: "class 7",
        subunit_count: 1,
        gene_count: 4,
        project_name: "beagle",
        plasmid_count: 2
      },
      {
        target_name: "protein m",
        target_id: 2345617,
        partner_name: "partner 17",
        class_name: "class 21",
        subunit_count: 1,
        gene_count: 4,
        project_name: "chihuahua",
        plasmid_count: 4
      },
      {
        target_name: "protein f",
        target_id: 2345618,
        partner_name: "partner 18",
        class_name: "class 3",
        subunit_count: 3,
        gene_count: 11,
        project_name: "bulldog",
        plasmid_count: 2
      },
      {
        target_name: "protein e",
        target_id: 2345619,
        partner_name: "partner 19",
        class_name: "class 6",
        subunit_count: 3,
        gene_count: 8,
        project_name: "collie",
        plasmid_count: 4
      },
      {
        target_name: "protein y",
        target_id: 2345620,
        partner_name: "partner 20",
        class_name: "class 2",
        subunit_count: 1,
        gene_count: 2,
        project_name: "boxer",
        plasmid_count: 10
      },
      {
        target_name: "protein g",
        target_id: 2345621,
        partner_name: "partner 21",
        class_name: "class 5",
        subunit_count: 2,
        gene_count: 3,
        project_name: "chihuahua",
        plasmid_count: 2
      },
      {
        target_name: "protein f",
        target_id: 2345622,
        partner_name: "partner 22",
        class_name: "class 17",
        subunit_count: 2,
        gene_count: 2,
        project_name: "dobermann",
        plasmid_count: 2
      },
      {
        target_name: "protein s",
        target_id: 2345623,
        partner_name: "partner 23",
        class_name: "class 1",
        subunit_count: 3,
        gene_count: 5,
        project_name: "bulldog",
        plasmid_count: 4
      },
      {
        target_name: "protein z",
        target_id: 2345624,
        partner_name: "partner 24",
        class_name: "class 21",
        subunit_count: 3,
        gene_count: 6,
        project_name: "terrier",
        plasmid_count: 4
      },
      {
        target_name: "protein q",
        target_id: 2345625,
        partner_name: "partner 25",
        class_name: "class 2",
        subunit_count: 3,
        gene_count: 6,
        project_name: "mastiff",
        plasmid_count: 4
      },
      {
        target_name: "protein m",
        target_id: 234526,
        partner_name: "partner 26",
        class_name: "class 4",
        subunit_count: 1,
        gene_count: 1,
        project_name: "samoyed",
        plasmid_count: 2
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
        protein_class_name: "Protein Class C",
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

    const targetsProperty: ITargetProperties = {
      protein: {
        name: "Heavy Fat Protein",
        avg_molecular_weight_ox: "83469.9230",
        monoisotopic_weight_ox: "83502.4876",
        avg_molecular_weight_red: "7.2296",
        monoisotopic_weight_red: "8.1096",
        isoelectric_point: "-0.21",
        gravy: "-8.500",
        aromaticity: "-9.9",
        e280_mass_ox: "60390",
        e280_mass_red: "83456",
        e214_mass: "4355",
        e280_molar_ox: "6732",
        e280_molar_red: "43722",
        e214_molar: "824289"
      },
      subunits: [
        {
          name: "ABC-123",
          avg_molecular_weight_ox: "13469.9230",
          monoisotopic_weight_ox: "13502.4876",
          avg_molecular_weight_red: "7.2296",
          monoisotopic_weight_red: "6.1096",
          isoelectric_point: "-0.21",
          gravy: "-3.500",
          aromaticity: "-9.9",
          e280_mass_ox: "60390",
          e280_mass_red: "13456",
          e214_mass: "1355",
          e280_molar_ox: "6732",
          e280_molar_red: "43722",
          e214_molar: "824289"
        },
        {
          name: "ABC-123",
          avg_molecular_weight_ox: "23469.9230",
          monoisotopic_weight_ox: "23502.4876",
          avg_molecular_weight_red: "7.2296",
          monoisotopic_weight_red: "6.1096",
          isoelectric_point: "-0.21",
          gravy: "-3.500",
          aromaticity: "-9.9",
          e280_mass_ox: "20390",
          e280_mass_red: "23456",
          e214_mass: "4355",
          e280_molar_ox: "6732",
          e280_molar_red: "43722",
          e214_molar: "224289"
        },
        {
          name: "GHI-789",
          avg_molecular_weight_ox: "343469.9230",
          monoisotopic_weight_ox: "33502.4876",
          avg_molecular_weight_red: "7.2296",
          monoisotopic_weight_red: "6.1096",
          isoelectric_point: "-0.21",
          gravy: "-3.500",
          aromaticity: "-9.9",
          e280_mass_ox: "30390",
          e280_mass_red: "23456",
          e214_mass: "3355",
          e280_molar_ox: "6732",
          e280_molar_red: "43722",
          e214_molar: "824289"
        },
        {
          name: "JKL-987",
          avg_molecular_weight_ox: "43469.9230",
          monoisotopic_weight_ox: "43502.4876",
          avg_molecular_weight_red: "7.2296",
          monoisotopic_weight_red: "6.1096",
          isoelectric_point: "-0.21",
          gravy: "-4.500",
          aromaticity: "-3.9",
          e280_mass_ox: "40390",
          e280_mass_red: "23456",
          e214_mass: "4355",
          e280_molar_ox: "4732",
          e280_molar_red: "43722",
          e214_molar: "824289"
        },
        {
          name: "MNO-654",
          avg_molecular_weight_ox: "53469.9230",
          monoisotopic_weight_ox: "53502.4876",
          avg_molecular_weight_red: "7.2296",
          monoisotopic_weight_red: "6.1096",
          isoelectric_point: "-0.21",
          gravy: "-3.500",
          aromaticity: "-9.9",
          e280_mass_ox: "50390",
          e280_mass_red: "23456",
          e214_mass: "4355",
          e280_molar_ox: "6732",
          e280_molar_red: "543722",
          e214_molar: "524289"
        },
        {
          name: "PQR-321",
          avg_molecular_weight_ox: "63469.9230",
          monoisotopic_weight_ox: "63502.4876",
          avg_molecular_weight_red: "7.2296",
          monoisotopic_weight_red: "6.1096",
          isoelectric_point: "-0.21",
          gravy: "-3.500",
          aromaticity: "-6.9",
          e280_mass_ox: "60390",
          e280_mass_red: "63456",
          e214_mass: "4355",
          e280_molar_ox: "6732",
          e280_molar_red: "43722",
          e214_molar: "824289"
        }
      ]
    };

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
      targetsProperty,
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
            sequence: "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
            + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
            + "ACGACTGACATCGACGATCGTTCTGGATCGACTGCATACGACATCGACTGACCTGCACTG"
            + "CGATATCATGATAACGATGCATGCAACTAATGCAATGCATGATGACACTAGACTAAGATGACTTCCGATAAATGCAGATCGAGACTACG"
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



  // Common response interceptor.
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
