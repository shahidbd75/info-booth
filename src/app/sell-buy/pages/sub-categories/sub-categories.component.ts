import { Component, OnInit, ViewChild } from '@angular/core';
import { SubCategoryService } from '../../services/sub-category.service';
import { MatTableDataSource } from '@angular/material/table';
import { SubCategoryRequestModel, SubCategoryResponse } from '../../models/sub-category.model';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-sub-categories',
  templateUrl: './sub-categories.component.html',
  styleUrls: ['./sub-categories.component.scss']
})
export class SubCategoriesComponent implements OnInit {
  dataSource = new MatTableDataSource<SubCategoryResponse>();
  isLoading = false;
  subscription$: Subscription;
  pageSize = 10;
  page = 0;
  count = 100;
  pageEvent: PageEvent;
  keyword = '';
  sortField = 'name';
  sortOrder = 'asc';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private subCategoriesService: SubCategoryService) {

  }
  ngOnInit(): void {
   this.loadCategories();
  }

  loadCategories() {
    this.subCategoriesService.getAllSubCategories().subscribe((response: SubCategoryResponse[]) => {
      this.dataSource = new MatTableDataSource<SubCategoryResponse>(response);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
      this.sortChange();
    });
  }

  onFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onPageChange(event: any): void {
    console.log(event);
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  sortChange() {
    this.sort.sortChange.subscribe((_sort: Sort)=> {
      this.page = 0;
      this.sortField = _sort.active;
      this.sortOrder = _sort.direction;
    });
  }
}
