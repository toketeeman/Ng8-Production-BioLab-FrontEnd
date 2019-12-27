export interface IUser {
  username: string;
  password?: string;
  token?: string;
}

export interface ITarget {
  target_name: string;
  target_id?: string;        // Mandatory on the fetch from the DB.
  partner: string;
  protein_class_pk: string;
  notes: string;
  project_name: string;
  subunits: ISubunit[];
}

export interface ISubunit {
  subunit_name: string;
  subunit_id?: number;
  copies: number;
  amino_acid_fasta_description: string;
  amino_acid_sequence: string;
  dna_fasta_description: string;
  dna_sequence: string;
}

export interface IProteinClass {
  protein_class_name: string;
  protein_class_pk: string;
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

export interface ISubunitInteraction {
  subunit_one_name: string;
  subunit_one_copy: number;
  subunit_two_name: string;
  subunit_two_copy: number;
  interaction: string;
}

export interface IPostTranslationalModification {
  subunit_one_name: string;
  subunit_one_residue: number;
  subunit_two_name: string;
  subunit_two_residue: number;
  ptm: string;
}

export interface IGridTarget {
  target_name: string;
  target_id?: number;
  partner_name: string;
  class_name: string;
  subunit_count: number;
  gene_count: number;
  project_name: string;
  plasmid_count: number;
}

export interface IGridPlasmid {
  plasmid_id: string;
  description: string;
  marker: string;
  target_name: string;
  project_name: string;
}

export interface IGridPlasmidDetail {
  name: string;
  feature_type: string;
  sequence_span: string;
  strand: string;
  dna_sequence: string;
  feature_qualifier: IGridFeatureQualifier[];
}

export interface IGridFeatureQualifier {
  type: string;
  value: string;
}

export interface ITargetDetailHeader {
  target_name: string;
  target_id?: string;        // Mandatory on the fetch from the DB.
  partner: string;
  protein_class_name: string;
  project_name: string;
  notes: string;
  subunits?: ISubunit[];
}

export interface ITargetDetail {
  target: ITargetDetailHeader;
  interactions: ISubunitInteraction[];
  ptms: IPostTranslationalModification[];
}

export interface ITargetProperty {
  protein: ITargetPropertyList;
  subunits: ITargetPropertyList[];
}

export interface ITargetPropertyList {
  name: string;
  monoiso_mw_ox: string;
  ave_mw_red: string;
  monoiso_mw_red: string;
  isoelect_pt: string;
  gravy: string;
  aromaticity: string;
  mol_ext_coeff_280_nm_ox: string;
  mol_ext_coeff_280_nm_red: string;
  mol_ext_coeff_214_nm: string;
}
