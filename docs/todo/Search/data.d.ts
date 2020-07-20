import { ProColumns } from '@ant-design/pro-table';

export interface SearchProps {
  colunms: ProColumns;
  type: 'simple' | 'advance';
  changeType: () => void;
  submit: () => void;
  reset: () => void;
}
