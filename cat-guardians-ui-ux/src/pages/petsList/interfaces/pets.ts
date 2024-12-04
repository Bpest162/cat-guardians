export enum Gender {
  male = "M",
  female = "F"
}

export interface IPets {
  id?: number;
  name?: string;
  color?: string;
  age?: string | null;
  gender?: Gender;
  breed?: string;
  birth_date?: string;
  bio?: string;
  requirements_for_owner?: string;
  preferences?: string;
  aversions?: string;
  likes?: [];
  photos?: string[];
}
