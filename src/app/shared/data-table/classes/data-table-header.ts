import { DataTableSearchCriteria } from './data-table-search-criteria';

export interface DataTableHeader {
	column: string;
	label: string;
	type?: string;
	selectCriteria?: DataTableSearchCriteria[];
}

export interface DataTableHeader {
  column: string;
  label: string;

}
