export interface OptionsModel
{
  id: string | number;
  name: string;
}

export type GenericOptionsModel<T> =
{
  id: T;
  name: string;
}