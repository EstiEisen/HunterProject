import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableComponent } from './data-table.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
	imports: [CommonModule, RouterModule],
	exports: [PaginationComponent],
	declarations: [DataTableComponent, PaginationComponent]
})
export class DataTableModule {}
