export interface ICategories {
  label: string;
  propertyName: string;
}

export const filterAgeList: ICategories[] = [
  {
    label: "Kitten (2 months - 1 years)",
    propertyName: "Kitten"
  },
  {
    label: "Junior (1 years - 3 years)",
    propertyName: "Junior"
  },
  {
    label: "Adult (3 years - 4 years)",
    propertyName: "Adult"
  },
  {
    label: "Senior (4 years and older)",
    propertyName: "Senior"
  }
];

export const filterGenderList: ICategories[] = [
  {
    label: "Male",
    propertyName: "M"
  },
  {
    label: "Female",
    propertyName: "F"
  }
];

export const filterColorList: ICategories[] = [
  {
    label: "Black",
    propertyName: "Black"
  },
  {
    label: "White",
    propertyName: "White"
  },
  {
    label: "Gray",
    propertyName: "Gray"
  },
  {
    label: "Tabby",
    propertyName: "Tabby"
  },
  {
    label: "Orange",
    propertyName: "Orange"
  },
  {
    label: "Tortoiseshell",
    propertyName: "Tortoiseshell"
  },
  {
    label: "Blue",
    propertyName: "Blue"
  },
  {
    label: "Pointed",
    propertyName: "Pointed"
  },
  {
    label: "Calico",
    propertyName: "Calico"
  }
];
