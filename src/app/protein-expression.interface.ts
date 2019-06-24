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
  amino_acid_file: any;
  dna_file: any;
}

export interface IProteinClass {
  protein_class_name: string;
  protein_class_pk_id: number;
}

// @TODO export interface ISubunitInteraction
// @TODO export interface IPostTranslationMod
