export const TIME_FORMAT_READ = 'DD-MM-YYYY';
export const DATE_FORMAT = 'DD/MM/YYYY';
export const PAGINATION = {
  PAGEKEY: 'page',
  SIZEKEY: 'size',
  DEFAULT_PAGE_SIZE: 10,
};
export type OpType = 'EQUAL' | 'NOT_EQUAL' | 'LIKE' | 'IN' | 'BETWEEN';
export type FieldType = 'STRING' | 'LONG' | 'INTEGER' | 'DOUBLE' | 'DATE' | 'CHAR' | 'BOOLEAN';
export type Direction = 'DESC' | 'ASC';
export type Filter = {
  field: string;
  value: any;
};
export type Sort = {
  field: string;
  direction: Direction;
};
export interface ISearchParams {
  page: number;
  size: number;
  filters?: Filter[] | [];
  sorts?: Sort[] | [];
}
export type ConditionItem = {
  property: string;
  operator: string;
  value: any;
};

export const OPTIONS_FILTER = [
  { value: '<', label: 'nhỏ hơn' },
  { value: '>', label: 'lớn hơn' },
  { value: '=', label: 'bằng' },
];
export type OperationType =
  | '='
  | '<>'
  | '<'
  | '<='
  | '>'
  | '>='
  | 'startsWith'
  | 'endsWith'
  | 'contains'
  | 'notEmpty'
  | 'isNull'
  | 'in'
  | 'notIn';
export type InputSearch = {
  id: React.Key;
  disable?: boolean;
  property: string;
  label: string | string[];
  active: boolean;
  fieldType: any;
  operator: OperationType;
  value?: any;
  className?: string;
  onChange?: (value: any) => void;
} & (
  | {
      inputType: 'select';
      options: { value: React.Key; label: string }[];
    }
  | {
      inputType: 'text' | 'number' | 'date' | 'date-range';
    }
  | {
      inputType: 'date-range' | 'date';
      disable?: any;
    }
);
