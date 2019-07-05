export interface ITarget {
  target: string;
  partner: string;
  protein_class_pk: number;
  notes: string;
  project: string;
  subunits: ISubunit[];
}

export interface ISubunit {
  name: string;
  copies: number;
  // amino_acid_file: any;
  // dna_file: any;
  amino_acid_fasta_description: string;
  amino_acid_sequence: string;
  dna_fasta_description: string;
  dna_sequence: string;
}

export interface IProteinClass {
  protein_class_name: string;
  protein_class_pk_id: number;
}

export interface IFastaFile {
  sequence_type: string;
  expected_entry_count: number;
  fasta_file: any;
}

export interface IFastaResponse {
  sequence_type: string;
  expected_entry_count: number;
  actual_entry_count: number;
  fasta_entries: [
    {
      fasta_description: string;
      sequence_type: string;
      sequence: string;
    }
  ];
}
// @TODO export interface ISubunitInteraction
// @TODO export interface IPostTranslationMod
