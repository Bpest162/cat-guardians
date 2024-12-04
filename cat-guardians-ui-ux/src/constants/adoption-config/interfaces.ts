export interface ISteps {
  id: number;
  label: string;
  fields?: string[];
}

export interface IFormElementsAttribute {
  id?: number;
  forId?: string;
  label?: string;
  value?: string;
  registerName?: string;
  type?: string;
  placeholder?: string;
}
